MAPS=../maps/wkt

for dir in wktconv wktmerge jsonmerge; do
  pushd _cmd/$dir
  go build *.go
  popd
done

alias wktconv=_cmd/wktconv/wktconv
alias wktmerge=_cmd/wktmerge/wktmerge
alias jsonmerge=_cmd/jsonmerge/jsonmerge

# Import this file from:
# https://docs.google.com/spreadsheets/d/1GSvcumdud0zHzfBC4eRC6em-OK5wSabYrK8MSJbe4ck/edit#gid=1031899559
source _cmd/regenerate_maps_data.sh
