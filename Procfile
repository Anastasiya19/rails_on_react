web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}
web: rails s -p 3000 -b 127.0.0.1
client: sh -c 'rm -rf public/webpack/development/* || true && cd client && bundle exec rake react_on_rails:locale && yarn run build:development'
