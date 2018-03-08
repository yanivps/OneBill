class CreditCardsController < ApplicationController
  before_action :set_credit_card, only: [:destroy]

  def index
    @credit_cards = current_user.credit_cards
  end

  def destroy
    @credit_card.update_attributes(user_id: nil, token: nil)
    head :no_content
  end

  private
    def set_credit_card
      @credit_card = current_user.credit_cards.find(params[:id])
    end
end
