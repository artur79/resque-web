require 'twitter-bootstrap-rails' if defined?(Sprockets::Railtie)
require 'font-awesome-sass' if defined?(Sprockets::Railtie)
require 'jquery-rails' if defined?(Sprockets::Railtie)

module ResqueWeb
  class Engine < ::Rails::Engine
    isolate_namespace ResqueWeb

    initializer "resque_web.assets" do |app|
      app.config.assets.paths << root.join("app/assets/stylesheets")
      app.config.assets.paths << root.join("app/assets/images")
    end

    initializer "resque_web.assets.precompile" do |app|
      if defined?(Propshaft)
        app.config.assets.precompile += %w(resque_web/resque-web-application.js)
      end

      if defined?(Dartsass)
        resque_scss_file = root.join('app/assets/stylesheets/resque_web/resque-web-application.scss')
        if File.exist?(resque_scss_file)
          app.config.dartsass.builds[resque_scss_file.to_s] = 'resque_web/resque-web-application.css'
        end
      else
        app.config.assets.precompile += %w( resque_web/resque-web-application.scss )
      end

      app.config.assets.precompile += %w(resque_web/*.png)
    end
  end

  module Plugins
    def self.plugins
      self.constants.map{|m| self.const_get(m)}
    end
  end
end
