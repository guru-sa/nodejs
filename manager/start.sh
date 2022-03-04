if [ -f  ${PWD}/manager.log ]; then
    rm ${PWD}/manager.log
fi
./node_modules/.bin/forever start -l ${PWD}/manager.log ./manager.js