# Run me with:
#   $ watchr gem.watchr

# --------------------------------------------------
# Rules
# --------------------------------------------------
watch(/^src\/.*/) { |md| examples }
watch(/^spec\/.*/) { |md| examples unless md =~ /browserify/ }

# --------------------------------------------------
# Signal Handling
# --------------------------------------------------
begin
  Signal.trap('QUIT') { examples }       # Ctrl-\
rescue ArgumentError
end
Signal.trap('INT' ) { abort("\n") } # Ctrl-C

# --------------------------------------------------
# Helpers
# --------------------------------------------------
def examples
  system 'clear'
  puts; system 'rake examples'
end
