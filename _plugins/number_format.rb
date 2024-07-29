module Jekyll
  module NumberFormat
    def number_with_delimiter(number, delimiter = ',')
      parts = number.to_s.split('.')
      parts[0].gsub!(/(\d)(?=(\d\d\d)+(?!\d))/, "\\1#{delimiter}")
      parts.join('.')
    end
  end
end

Liquid::Template.register_filter(Jekyll::NumberFormat)
