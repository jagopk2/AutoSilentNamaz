import BackgroundService from 'react-native-background-actions';

const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise((resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(i);
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Namaz App',
    taskTitle: 'Namaz App',
    taskDesc: 'ExampleTask desc',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
        delay: 1000,
    },
};


await BackgroundService.start(veryIntensiveTask, options);
// iOS will also run everything here in the background until .stop() is called
await BackgroundService.stop();