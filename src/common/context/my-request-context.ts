import { RequestContext } from '@medibloc/nestjs-request-context';

export class MyRequestContext extends RequestContext {
  user: any;
  body: any;
  params: any;
  query: any;
}
