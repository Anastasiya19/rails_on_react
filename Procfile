web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}
web: rails s -p 3000 -b 127.0.0.1
rails-client-assets: sh -c 'bundle exec rake react_on_rails:locale && yarn run build:dev:client'
rails-server-assets: sh -c 'yarn run build:dev:server'