inotifywait -q -m -e close_write --format %e ./lib |
while read events; do
  yarn prepare
done