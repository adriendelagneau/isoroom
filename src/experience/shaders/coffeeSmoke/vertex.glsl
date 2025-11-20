varying vec2 vUv;

vec2 rotate2D(vec2 value,float angle)
{
  float s=sin(angle);
  float c=cos(angle);
  mat2 m=mat2(c,s,-s,c);
  return m*value;
}

void main(){
  vec3 newPosition=position;

  // Twist
  float angle = newPosition.y*5.0;
  newPosition.xz = rotate2D(newPosition.xz, angle);
  
  gl_Position=projectionMatrix*modelViewMatrix*vec4(newPosition,1.);
  
  vUv=uv;
  
}