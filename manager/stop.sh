
SERVER_IDX=$(./node_modules/.bin/forever list 2>/dev/null | grep ${PWD} | awk '{print $2;}')
echo ${SERVER_IDX}
if [ -z ${SERVER_IDX} ]; then
    exit 1
fi

./node_modules/.bin/forever stop ${SERVER_IDX:1:-1}