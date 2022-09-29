const delay = (ms) => new Promise((res, rej) => {
  setTimeout(res, ms);
});

const script = async () => {
  console.log('run');
  await delay(2000);
  console.log('complete');
}

script();
