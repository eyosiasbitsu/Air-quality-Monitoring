#define myserial Serial2

// sample data
int temp = 34;
int sp = 345;
int humidity = 234;

String sensorID = "4";

void setup() {
  myserial.begin(9600);
  Serial.begin(9600);
  Serial.println("Initializing...");

  initGSM();

  sensorID = "00001";
}

void loop() {
  String sendToServer = "{\"idd\":\"" + sensorID + "\",\"humidity \":\"" + String(humidity) + "\",\"particle_size\":\"" + String(sp) + "\",\"temperature\":\"" + String(temp) + "\"}";

  Serial.println(sendToServer);
  sendDataToServer(sendToServer);
  delay(5000);
}

void initGSM() {
  myserial.println("AT");
  ShowSerialData();
  delay(2000);
  myserial.println("ATI");
  ShowSerialData();
  delay(2000);
  myserial.println("AT+CSQ");
  ShowSerialData();
  delay(2000);
  myserial.println("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
  ShowSerialData();
  delay(3000);
  myserial.println("AT+SAPBR=3,1,\"APN\",\"etc.com\"");
  ShowSerialData();
  delay(3000);
  myserial.println("AT+SAPBR=1,1");
  ShowSerialData();
  delay(3000);
  myserial.println("AT+SAPBR=2,1");
  ShowSerialData();
  delay(3000);
  myserial.println("AT+HTTPSSL=1");
  ShowSerialData();
  delay(3000);
  myserial.println("AT+HTTPINIT");
  ShowSerialData();
  delay(3000);
  myserial.println("AT+HTTPPARA=\"CID\",1");
  ShowSerialData();
  delay(3000);
  myserial.println("AT+HTTPPARA=\"CONTENT\",\"application/json\"");
  ShowSerialData();
  delay(3000);
}

void sendDataToServer(String data) {
  myserial.println("AT+HTTPPARA=\"URL\",\"https://air-quality-monitor-9777f-default-rtdb.firebaseio.com/sensorData.json?auth=KcTdDDTEihwvKSZXrlViKQheB6QzmCo1R25OPWeR\"");
  ShowSerialData();
  delay(3000);
  myserial.println("AT+HTTPDATA=" + String(data.length()) + ",100000");
  ShowSerialData();
  delay(3000);
  myserial.println(data);
  ShowSerialData();
  delay(3000);
  myserial.println("AT+HTTPACTION=1");
  ShowSerialData();
  delay(5000);
  myserial.println("AT+HTTPREAD");
  ShowSerialData();
  delay(3000);
}

void ShowSerialData() {
  while (myserial.available() != 0) {
    Serial.write(myserial.read());
  }
  delay(500);
}
