class Queue {
    constructor() {
        this.main = [];
    }

    push(action) {
        this.main.push(action);

        if (this.main.length == 0) 
            process();
    }

    pop() {
        this.main.pop();
        
        if (this.main.length > 0)
            process();
    }

    process() {
        this.main[0].run();
    }

}

module.exports = {
    Queue
}