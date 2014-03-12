var rsa = {};

rsa.generateKeys = function(p, q){ //p and q are primes
  var z = (p-1)*(q-1);
  var k = rsa.randomCoprime(z);

  return {
    public: k,
    private: rsa.calculatePrivateKey(k, z),
    common: p*q
  };
};

rsa.randomCoprime = function(z){
  var cp = (Math.random()*z) >> 1;
  while(rsa.gcd(z, cp) > 1){
    cp++;
  }
  return cp;
};

rsa.gcd = function gcd(a,b) {
  if (b) {
    return gcd(b, a % b);
  } else {
    return Math.abs(a);
  }
};

rsa.calculatePrivateKey = function(k, z){
  var j = (Math.random()*k) >> 1;
  while(true){
    if( (k * j)%z === 1 ){
      return j;
    }
    j++;
  }
};

rsa.encryptMessage = function(msg, publicKey, commonKey){

};

rsa.decryptMessage = function(msg, privateKey, commonKey){

};

rsa.encrypt = function(number, publicKey, commonKey){
  return Math.pow(number, publicKey) % commonKey;
};
rsa.decrypt = function(number, privateKey, commonKey){
  return Math.pow(number, privateKey) % commonKey;
};
