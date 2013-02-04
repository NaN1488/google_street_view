require 'rails/generators'

module GoogleStreetView
  module Generators
    class ImagesGenerator < ::Rails::Generators::Base

      source_root File.expand_path("../templates", __FILE__)
      desc "This generator takes images (jpg or png) and generate tile images for GoogleStreetView"
      argument :source_path, :type => :string
      argument :target_path, :type => :string, :default => 'app/assets/images/google_street_view'
      def generate_images
        generator = GoogleStreetView::Generator.new 
        generator.generate(source_path, target_path)
      end

      def add_javascript_tamplate
        if File.exist?('app/assets/javascripts/application.js')
          insert_into_file "app/assets/javascripts/application.js", "//= require google_street_view\n", :after => "jquery_ujs\n"
        else
          copy_file "application.js", "app/assets/javascripts/application.js"
        end
        copy_file 'google_street_view.js', 'app/assets/javascripts/google_street_view.js'
      end
      
    end
  end
end