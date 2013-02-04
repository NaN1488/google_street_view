require "GoogleStreetView/version"
require 'rubygems'
require 'rmagick'
require 'pry'

module GoogleStreetView
	include Magick
	REGEX_FILE_EXT = /\.jpg$|\.png$/i
	
	def self.generate *args
		source_path = args.first
		target_path = args.last
		source_path = Dir.pwd + "/#{source_path}" unless source_path.start_with? '/'
		if source_path.match(REGEX_FILE_EXT).nil?
			images = Dir.entries(source_path).collect!{|f| source_path + f}.reject { |file_name| file_name.match(REGEX_FILE_EXT).nil? }
		else
			images = [source_path]
		end	
		target_path = Dir.pwd + "/#{target_path}" unless target_path.start_with? '/'

		Dir.mkdir target_path unless Dir.exist? target_path

		tile_size = {w:512, h:512}

		images.each do |image|
			crop image, target_path, tile_size
		end
		puts "tiles in #{target_path}"
	end

	def self.crop file_path, target_path, tile_size

		image = Image.read(file_path).first
		file_name = image.filename.split(/\//).last.split(/\./).first
		image = image.scale(4096, 2048)
		puts "cropping #{file_name}..."
		Dir.mkdir target_path + "/#{file_name}" unless Dir.exist? target_path + "/#{file_name}"
		(image.columns / tile_size[:w]).times do |tile_x|
			(image.rows / tile_size[:h]).times do |tile_y|
				x = tile_x * tile_size[:w]
				y = tile_y * tile_size[:h]
				tile = image.crop x, y, tile_size[:w], tile_size[:h]
				tile.write "#{target_path}/#{file_name}/#{file_name}_#{tile_x}_#{tile_y}.jpg"
				tile = nil
			end
		end
		image = nil;
		puts "Done!"
	end

end
