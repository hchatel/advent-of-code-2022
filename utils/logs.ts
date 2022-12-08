import util from 'util';

export const solveWithLogs = (solver, index) => {
    console.log(`\n### Solve problem ${index}...`);

    const timerLabel = `\n- Solved problem ${index} in`;
    console.time(timerLabel);

    const result1 = solver();
    console.info(`\n====> `, result1);

    console.timeEnd(timerLabel);

    console.info('\n');
};

export const displayDeepObject = (object, depth = null) => util.inspect(object, true, depth);
