# frozen_string_literal: true

# /scripts/start_server.shにdeploymentで載っている。CodeDeploy用。
# 本番環境への移行時、修正を忘れないこと。

# paths
app_path = '/var/www/Virtual-Map-Walker'
pid_path = "#{app_path}/tmp/pids/unicorn.pid"
listen_path = "#{app_path}/tmp/sockets/unicorn.sock"
# unicorn paths
working_directory app_path
pid pid_path

# listen
listen listen_path, backlog: 64

# logging
stderr_path "#{app_path}/log/unicorn.stderr.log"
stdout_path "#{app_path}/log/unicorn.stdout.log"

# workers
worker_processes 2

# Time-out
timeout 30

# use correct Gemfile on restarts
before_exec do |_server|
  ENV['BUNDLE_GEMFILE'] = "#{app_path}/current/Gemfile"
end

# preload
preload_app true

before_fork do |server, _worker|
  # the following is highly recomended for Rails + "preload_app true"
  # as there's no need for the master process to hold a connection
  ActiveRecord::Base.connection.disconnect! if defined?(ActiveRecord::Base)

  # Before forking, kill the master process that belongs to the .oldbin PID.
  # This enables 0 downtime deploys.
  old_pid = "#{server.config[:pid]}.oldbin"
  if File.exist?(old_pid) && server.pid != old_pid
    begin
      Process.kill('QUIT', File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
      # someone else did our job for us
    end
  end
end

after_fork do |_server, _worker|
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord::Base)
end
