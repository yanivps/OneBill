module CoreExtensions
  module Hash
    module Camelize
      def camelize_recursive(camel_style = :lower)
        {}.tap do |h|
          self.each { |key, value| h[key.to_s.camelize(camel_style)] = CoreExtensions::Hash::Camelize::map_value(value) }
        end
      end

      def self.map_value(thing)
        case thing
        when ::Hash
          thing.camelize_recursive
        when Array
          thing.map { |v| map_value(v) }
        else
          thing
        end
      end
    end
  end
end
