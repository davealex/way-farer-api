// handle route request to '/'
const getIndex = (req, res) => {
  res.status(200).json(
    {
      status: 200,
      message: 'Welcome to WayFarer! (API)',
      data: {
        service: 'way-farer-api',
        version: '1.0',
        github: 'https://github.com/davealex/way-farer-api',
      },
    },
  );
};

export default getIndex;
