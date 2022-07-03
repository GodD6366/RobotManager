// import axios from 'axios';

export async function talkWithTuling(text: string) {
  const response = await fetch('http://openapi.tuling123.com/openapi/api/v2', {
    method: 'POST',
    body: JSON.stringify({
      reqType: 0,
      perception: {
        inputText: {
          text,
        },
      },
      userInfo: {
        apiKey: '8a903d3283b5568e92a8dc1100cc591c',
        userId: 'OnlyUseAlphabet',
      },
    }),
  });

  const json = await response.json();
  console.log(
    `🔎🐛 -> file: tuling.ts -> line 21 -> talkWithTuling -> json`,
    JSON.stringify(json),
  );
  try {
    let { results } = json;
    let text = results[0].values.text;
    return text;
  } catch (error) {
    throw error;
  }
}
