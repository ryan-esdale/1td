import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc'
})
export class TruncPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
