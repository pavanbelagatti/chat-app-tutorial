const assert = require('chai').assert;
const io = require('socket.io-client');

const socketURL = 'http://localhost:3001';

describe('Chat Server', function() {
  let socket;

  beforeEach(function(done) {
    // Connect to the server
    socket = io.connect(socketURL);

    // Wait for the connection to be established
    socket.on('connect', function() {
      done();
    });
  });

  afterEach(function(done) {
    // Disconnect from the server
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  it('Should be able to send and receive messages', function(done) {
    // Set the timeout to 5000ms
    this.timeout(5000);

    // Send a message to the server
    socket.emit('message', 'Hello World');

    // Listen for messages from the server
    socket.on('message', function(message) {
      // Assert that the message is received
      assert.equal(message, 'Hello World');
      done();
    });
  });
});

