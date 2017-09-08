web: bundle exec puma -C config/puma.rb
web: rails s -p 3000 -b 127.0.0.1
client: sh -c 'rm -rf public/webpack/development/* || true && cd client && bundle exec rake react_on_rails:locale && yarn run build:development'
rails-client-assets: sh -c 'bundle exec rake react_on_rails:locale && yarn run build:dev:client'
rails-server-assets: sh -c 'yarn run build:dev:server'