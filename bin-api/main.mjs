import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

// Query city council
const UPRN = process.env.UPRN;
const url = `https://exeter.gov.uk/repositories/hidden-pages/address-finder/?qsource=UPRN&qtype=bins&term=${UPRN}`;
const response = await fetch(url)
const data = await response.json()
const results = data[0].Results;

// Gather bin data
let bins = {};
const dom = await new JSDOM(results);
const hs = dom.window.document.getElementsByTagName("h3")
for (let i=0; i<hs.length; i++) {
  let altText = hs[i].getElementsByTagName("img")[0].alt
  bins[altText] = hs[i].textContent;
}

console.log(bins)
