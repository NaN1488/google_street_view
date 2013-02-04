require "GoogleStreetView/version"
require 'rmagick'
require 'pry'
module GoogleStreetView
	class Generator
		include Magick
		REGEX_FILE_EXT = /\.jpg$|\.png$/i

		def generate source_path, target_path, tile_size=512

			source_path = Dir.pwd + "/#{source_path}" unless source_path.start_with? '/'
			source_path = "#{source_path}/" unless source_path.ends_with? '/'
			
			if Dir.exist? source_path
				images = Dir.entries(source_path).collect!{|f| source_path + f}.reject { |file_name| file_name.match(REGEX_FILE_EXT).nil? }
			elsif not source_path.match(REGEX_FILE_EXT).nil?
				images = [source_path]
			else
				puts source_path + ' incorrect file extension'
				return
			end	

			target_path = Dir.pwd + "/#{target_path}" unless target_path.start_with? '/'
			target_path = "#{target_path}/" unless target_path.ends_with? '/'

			Dir.mkdir target_path unless Dir.exist? target_path

			@tile_size = {w:tile_size, h:tile_size}

			images.each do |image|
				crop image, target_path
			end
			puts "Tiles images in #{target_path}"
		end

		def crop file_path, target_path
			#load Image
			image = Image.read(file_path).first
			file_name = image.filename.split(/\//).last.split(/\./).first
			#scale Image for standar Google Street View
			image = image.scale(4096, 2048)
			print "processing #{file_name}..."
			Dir.mkdir target_path + "/#{file_name}" unless Dir.exist? target_path + "/#{file_name}"
			#create tiles
			(image.columns / @tile_size[:w]).times do |tile_x|
				(image.rows / @tile_size[:h]).times do |tile_y|
					x = tile_x * @tile_size[:w]
					y = tile_y * @tile_size[:h]
					tile = image.crop x, y, @tile_size[:w], @tile_size[:h]
					tile.write "#{target_path}/#{file_name}/#{file_name}_#{tile_x}_#{tile_y}.jpg"
				end
			end
			puts "OK"
		end
	end

end
