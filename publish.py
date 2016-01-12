#!/bin/env python
from __future__ import print_function
from fabric.api import *
from string import strip

WORK_DIR = '/var/www/ishu'
def read_config():
    with open('server.config', 'r') as f:
        env.host_string, env.user, env.password = map(strip, f.readlines())
        print(env.host_string, env.user, env.password)


def push():
    ''' push local code to server

    '''
    read_config()
    #local('npm install')
    local('webpack --config webpack.config.js')
    run('mkdir -p {}'.format(WORK_DIR))
    with cd('/var/www/ishu'):
        run('mkdir -p build public style pserver templates src/progress')
        put('build/*','./build')
        put('style/*', './style')
        put('public/*','./public')
        put('templates/*', './templates')
        put('pserver/iSHU/*','./pserver/iSHU')
        run('rm pserver/iSHU/getData/*.py')
        run('rm pserver/iSHU/askbar/*.py')
        put('src/progress/*','./src/progress')


if __name__ == "__main__":
    read_config()
