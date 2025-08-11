import { $ } from 'bun'

async function nonHdrColor(
  filename: string,
  color: string,
  size = '1024x1024'
) {
  await $`magick -size ${size} xc:${color} \
    ${filename}`
}

async function hdrColor(filename: string, color: string, size = '1024x1024') {
  const tmp = await $`mktemp /tmp/hdrcolor.XXXXXX.png`.text()
  const tmpPath = tmp.trim()

  try {
    await $`magick \
      -size ${size} xc:"${color}" -depth 16 \
      -profile '/System/Library/ColorSync/Profiles/sRGB Profile.icc' \
      ${tmpPath}`

    await $`avifenc --yuv 444 --depth 10 --cicp 1/16/1 \
      -q 56 --speed 4 \
      ${tmpPath} ${filename}`
  } finally {
    await $`rm -f ${tmpPath}`
  }
}

const colors = [
  ['red', '#bd4900ff'],
  ['orange', '#e26900ff'],
  ['gold', '#ffbb00ff'],
  ['yellow', '#ffcc00ff'],
  ['yellowgreen', '#bdd600ff'],
  ['green', '#14c900ff'],
  ['bluegreen', '#00d9bfff'],
  ['cyan', '#00c3ffff'],
  ['blue', '#008cffff'],
  ['blurple', '#5c4f8f'],
  ['purple', '#b300ffff'],
  ['pink', '#ff69b4ff'],
]

for (const [name, hex] of colors) {
  await hdrColor(`colors/${name}.avif`, hex)
  // await nonHdrColor(`colors/${name}-non-hdr.avif`, hex)
}
