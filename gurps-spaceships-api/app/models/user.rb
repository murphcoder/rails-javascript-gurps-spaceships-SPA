class User < ApplicationRecord
    has_many :spaceships
    validates_presence_of :username, :password_digest
    validates_uniqueness_of :username
end
