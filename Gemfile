source "https://rubygems.org"

gem "webrick", "~> 1.8"
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-redirect-from"
end

# Windows y JRuby no incluyen archivos zoneinfo, así que incluye la gema tzinfo-data
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Bloquea la gema http_parser.rb a v0.6.x en compilaciones JRuby
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]