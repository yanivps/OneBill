module ExceptionHandler
  extend ActiveSupport::Concern

  class InternalError < StandardError; end
  class BadRequest < StandardError; end
  class Forbidden < StandardError; end
  class AuthenticationError < StandardError; end
  class MissingToken < StandardError; end
  class InvalidToken < StandardError; end
  class InvalidOperation < StandardError; end

  included do
    rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_two
    rescue_from ExceptionHandler::InternalError, with: :internal_error
    rescue_from ExceptionHandler::BadRequest, with: :bad_request
    rescue_from ExceptionHandler::Forbidden, with: :forbidden
    rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized_request
    rescue_from ExceptionHandler::MissingToken, with: :four_twenty_two
    rescue_from ExceptionHandler::InvalidToken, with: :four_twenty_two
    rescue_from ExceptionHandler::InvalidOperation, with: :four_twenty_two

    rescue_from ActiveRecord::RecordNotFound do |e|
      json_response({ message: e.message }, :not_found)
    end

    # JSON response with message; Status code 422 - unprocessable entity
    def four_twenty_two(e)
      json_response({ message: e.message }, :unprocessable_entity)
    end

    # JSON response with message; Status code 401 - Unauthorized
    def unauthorized_request(e)
      json_response({ message: e.message }, :unauthorized)
    end

    # JSON response with message; Status code 500 - Internal Server Error
    def internal_error(e)
      json_response({ message: e.message }, :internal_server_error)
    end

    # JSON response with message; Status code 400 - Bad Request
    def bad_request(e)
      json_response({ message: e.message }, :bad_request)
    end

    # JSON response with message; Status code 400 - Bad Request
    def forbidden(e)
      json_response({ message: e.message }, :forbidden)
    end
  end
end
