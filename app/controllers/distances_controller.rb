class DistancesController < ApplicationController
    skip_before_action :check_logged_in, only: :create

    def new
        # @distance = Distance.new
    end

    def create

        

        pp "createだよー"
        binding.pry
        x = params.require(:key1)
        pp "paramsは↓"
        pp params
        pp "xは↓"
        pp x
        wday = params.require(:w_day)
        wdis = params.require(:w_dis)
        @distance = Distance.new(
            walking_day: wday,
            walking_distance: wdis
        )
        @distance.save
        binding.pry
        #ここから地図に入る？
        redirect_to root_path
    end

    # private
    #     def distance_params
    #         params.require(:w_day)
    #         params.require(:w_dis)
    #     end

end
