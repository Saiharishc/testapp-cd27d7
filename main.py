from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get('/test')
def read_test():
    return {"message": "API is running"}

class TestData(BaseModel):
    data: str

@app.post('/test')
def echo_test_data(test_data: TestData):
    return test_data
