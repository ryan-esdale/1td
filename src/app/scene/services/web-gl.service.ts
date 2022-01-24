import { Injectable } from '@angular/core';
import { isThisTypeNode } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class WebGLService {

  private _renderingContext: RenderingContext | undefined | null;
  private get gl(): WebGLRenderingContext {
    return this._renderingContext as WebGLRenderingContext;
  }

  constructor() { }

  initialiseWebGLContext(canvas: HTMLCanvasElement) {
    // this._renderingContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    // if (!this.gl) {
    //   alert('Unable to initialise WebGL. Your browser may not support it');
    //   return;
    // }
    // this.setWebGLCanvasDimensions(canvas);
    // this.initialiseWebGLCanvas();

    this._renderingContext = canvas.getContext("2d");

    if (!this._renderingContext) {
      return;
    }
    this._renderingContext.fillRect(0, 0, canvas.width, canvas.height)
    this._renderingContext.fillStyle = "white";
    this._renderingContext.fillRect(30, 20, 10, 10);

  }

  setWebGLCanvasDimensions(canvas: HTMLCanvasElement) {
    this.gl.canvas.width = canvas.clientWidth;
    this.gl.canvas.height = canvas.clientHeight;
  }

  initialiseWebGLCanvas() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
  }
}
