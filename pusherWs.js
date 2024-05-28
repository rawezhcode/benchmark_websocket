import { check } from 'k6';
import ws from 'k6/ws';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 1900 }, // Ramp up to 100 users over 1 minute
        { duration: '2m', target: 1900 }, // Stay at 100 users for 3 minutes
        // { duration: '3m', target: 0 },   // Ramp down to 0 users over 1 minute
    ],
};

export default function () {
    
    const url = __ENV.PUSHER_URL;
    const params = { tags: { my_tag: 'my ws test' } };

    const res = ws.connect(url, params, function (socket) {
        socket.on('open', function () {
            console.log('Connected');

            socket.send(JSON.stringify({
                event: 'pusher:subscribe',
                data: {
                    channel: 'chats'
                }
            }));

            socket.on('message', function (message) {
                const msg = JSON.parse(message);
                if (msg.event === 'pusher:subscription_succeeded') {
                    console.log('Subscribed to channel');
                }
                check(msg, {
                    'is status 200': (m) => m.event === 'pusher:subscription_succeeded',
                });
            });

            socket.on('close', function () {
                console.log('Disconnected');
            });

            socket.on('error', function (e) {
                if (e.error() != 'websocket: close sent') {
                    console.log('An unexpected error occurred: ', e.error());
                }
            });

            sleep(5); // keep the connection open for 5 seconds
        });
    });

    check(res, { 'status is 101': (r) => r && r.status === 101 });
}
