# frozen_string_literal: true

rails_root = File.expand_path('..', __dir__)

worker_processes 2
working_directory rails_root

listen "#{rails_root}/tmp/sockets/unicorn.sock"
pid "#{rails_root}/tmp/pids/unicorn.pid"

stderr_path "#{rails_root}/log/unicorn_error.log"
stdout_path "#{rails_root}/log/unicorn.log"
