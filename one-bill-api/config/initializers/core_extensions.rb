# Hash.include CoreExtensions::Hash::Camelize

# Temporary workaround because of exception: 'A copy of CoreExtensions::Hash::Camelize has been removed from the module tree but is still active!'
def map_value(thing)
  case thing
  when ::Hash
    thing.camelize_recursive
  when Array
    thing.map { |v| map_value(v) }
  else
    thing
  end
end

class Hash
  def camelize_recursive(camel_style = :lower)
    {}.tap do |h|
      self.each { |key, value| h[key.to_s.camelize(camel_style)] = map_value(value) }
    end
  end
end
