const program = require('commander');

const APITests = require('../lib/tests.js');
const api = new APITests();

program
    .command('exec')
    .description('Executes a test.')
    .option('--t <num>', 'The test to run (1-10)', 1)
    .action(cmd => {
        try {
            api["test"+cmd.t]();
        }
        catch {
            console.log("Enter a --t flag corresponding to a test case.");
        }
    })

program.parse(process.argv);      