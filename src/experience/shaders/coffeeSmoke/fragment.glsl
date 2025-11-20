uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main(){
  
  // Scale and animate
  vec2 smokeUv=vUv;
  smokeUv.x*=.5;
  smokeUv.y*=.3;
  smokeUv.y-=uTime*.07;
  
  // Smoke
  float smoke=texture(uPerlinTexture,smokeUv).r;
  
  // Remap
  smoke=smoothstep(.5,1.,smoke);
  
  // Edges
  // smoke = 1.0;
  smoke*=smoothstep(0.,.2,vUv.x);
  smoke*=smoothstep(1.,.8,vUv.x);
  
  smoke*=smoothstep(0.,.1,vUv.y);
  smoke*=smoothstep(1.,.3,vUv.y);
  
  gl_FragColor=vec4(1.,.878,.761,smoke);
  gl_FragColor=vec4(1.0 ,0.0, 0.0, 1.0);

  
}