/*
 * SSR entry point
 * This file provides the server render entry expected by the Qwik optimizer.
 */
import { renderToString } from '@builder.io/qwik/server';
import Root from './root';

export default function (opts: any) {
  return renderToString(<Root />, opts);
}
