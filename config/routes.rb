# == Route Map
#
#       Prefix Verb   URI Pattern                      Controller#Action
#         feed GET    /feed(.:format)                  feeds#show
#      session POST   /session(.:format)               sessions#create
#  new_session GET    /session/new(.:format)           sessions#new
#              DELETE /session(.:format)               sessions#destroy
#       tweets POST   /tweets(.:format)                tweets#create
# search_users GET    /users/search(.:format)          users#search
#  user_follow POST   /users/:user_id/follow(.:format) follows#create
#              DELETE /users/:user_id/follow(.:format) follows#destroy
#        users POST   /users(.:format)                 users#create
#     new_user GET    /users/new(.:format)             users#new
#         user GET    /users/:id(.:format)             users#show
#         root GET    /                                redirect(301, /feed)
#

AjaxTwitter::Application.routes.draw do
  resource :feed, only: [:show]
  resource :session, only: [:create, :destroy, :new]
  resources :tweets, only: [:create]
  resources :users, only: [:create, :new, :show] do
    get "search", on: :collection

    resource :follow, only: [:create, :destroy]
  end

  root to: redirect("/feed")
end
