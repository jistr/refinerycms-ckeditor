require 'pathname'
gempath = Pathname.new(File.expand_path('../../', __FILE__))
require gempath.join('..', 'base', 'lib', 'base', 'refinery')

gemspec = <<EOF
# DO NOT EDIT THIS FILE DIRECTLY! Instead, use lib/gemspec.rb to generate it.

Gem::Specification.new do |s|
  s.name              = %q{#{gemname = 'refinerycms-ckeditor'}}
  s.version           = %q{#{::Refinery.version}}
  s.summary           = %q{CKeditor engine for Refinery CMS}
  s.description       = %q{The basic CKeditor for Refinery CMS}
  s.date              = %q{#{Time.now.strftime('%Y-%m-%d')}}
  s.email             = %q{retro@ballgag.cz}
  s.homepage          = %q{http://refinerycms.com}
  s.rubyforge_project = %q{refinerycms}
  s.authors           = ['Smart Media Agency','Josef Šimanek']
  s.require_paths     = %w(lib)
  s.executables       = %w(#{Pathname.glob(gempath.join('bin/*')).map{|d| d.relative_path_from(gempath)}.sort.join(" ")})

  s.files             = [
    '#{%w( **/{*,.rspec,.gitignore,.yardopts} ).map { |file| Pathname.glob(gempath.join(file)) }.flatten.reject{|f|
      !f.exist? or f.to_s =~ /\.gem$/ or (f.directory? and f.children.empty?)
    }.map{|d| d.relative_path_from(gempath)}.uniq.sort.join("',\n    '")}'
  ]
end
EOF

(gemfile = gempath.join("#{gemname}.gemspec")).open('w') {|f| f.puts(gemspec)}
puts `cd #{gempath} && gem build #{gemfile}` if ARGV.any?{|a| a == "BUILD=true"}
