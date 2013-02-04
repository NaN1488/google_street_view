require 'rails/generators'

module GoogleStreetView
  module Generators
    class ImagesGenerator < ::Rails::Generators::Base

      #source_root File.expand_path("../templates", __FILE__)
      desc "This generator takes images and generate tile images for GoogleStreetView"
      argument :source_path, :type => :string
      argument :target_path, :type => :string, :default => 'app/assets/images/google_street_view'
      def generate
        GoogleStreetView::generate(source_path, target_path)
      end

    end
  end
end