// apiGlobals.js
let myGlobalVariable = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYzLCJyb2xlX2lkIjoxLCJ1c2VybmFtZSI6ImZsb29kIiwibmFtZSI6IlRlc3N0YSBNb25pdG9yIiwiZGVzaWduYXRpb24iOiJkZXZlbG9wZXIiLCJlbWFpbCI6Im1hc3VrQHJpbWVzLmludCIsInBlcm1pc3Npb25zIjpbIm1vZGlmeSBDb25maWd1cmF0aW9ucyIsIm1vZGlmeSBhbmFseXNpcyIsIm1vZGlmeSBkYXEiLCJtb2RpZnkgZGFxLXByb2Nlc3NvciIsIm1vZGlmeSBkYXRhLW9yaWdpbiIsIm1vZGlmeSBkYXRhLW9yaWdpbi1wYXJhbWV0ZXIiLCJtb2RpZnkgZGF0YS1zZXJpZXMiLCJtb2RpZnkgZGF0YS1zb3VyY2UiLCJtb2RpZnkgZWRpdC1vYnNlcnZhdGlvbiIsIm1vZGlmeSBmb2xkZXIiLCJtb2RpZnkgaWRhcSIsIm1vZGlmeSBpbWFnZXMiLCJtb2RpZnkgaW52ZW50b3J5IiwibW9kaWZ5IG1haW50ZW5hbmNlIiwibW9kaWZ5IG1ldGEtZGF0YSIsIm1vZGlmeSBtZXRhLWRhdGEtdGVtcGxhdGUiLCJtb2RpZnkgcGFyYW1ldGVyIiwibW9kaWZ5IHBhcmFtZXRlci10eXBlIiwibW9kaWZ5IHBlcm1pc3Npb24iLCJtb2RpZnkgcWMtY2hlY2siLCJtb2RpZnkgcWMtcnVsZSIsIm1vZGlmeSByb2xlIiwibW9kaWZ5IHN0YXRpb24iLCJtb2RpZnkgdGFnIiwibW9kaWZ5IHRvb2xzIiwibW9kaWZ5IHVuaXQiLCJtb2RpZnkgdXNlciIsInZpZXcgQ29uZmlndXJhdGlvbnMiLCJ2aWV3IGFuYWx5c2lzIiwidmlldyBkYXEiLCJ2aWV3IGRhcS1wcm9jZXNzb3IiLCJ2aWV3IGRhdGEtb3JpZ2luIiwidmlldyBkYXRhLW9yaWdpbi1wYXJhbWV0ZXIiLCJ2aWV3IGRhdGEtc2VyaWVzIiwidmlldyBkYXRhLXNvdXJjZSIsInZpZXcgZWRpdC1vYnNlcnZhdGlvbiIsInZpZXcgZm9sZGVyIiwidmlldyBpZGFxIiwidmlldyBpbWFnZXMiLCJ2aWV3IGludmVudG9yeSIsInZpZXcgbWFpbnRlbmFuY2UiLCJ2aWV3IG1ldGEtZGF0YSIsInZpZXcgbWV0YS1kYXRhLXRlbXBsYXRlIiwidmlldyBwYXJhbWV0ZXIiLCJ2aWV3IHBhcmFtZXRlci10eXBlIiwidmlldyBwZXJtaXNzaW9uIiwidmlldyBxYy1jaGVjayIsInZpZXcgcWMtcnVsZSIsInZpZXcgcm9sZSIsInZpZXcgc3RhdGlvbiIsInZpZXcgdGFnIiwidmlldyB0b29scyIsInZpZXcgdW5pdCIsInZpZXcgdXNlciJdLCJjbGllbnRpcCI6IjE3Mi4zMS4xMS4yMiIsImlhdCI6MTcwMTMyNDMxMywiZXhwIjoxNzAxNDEwNzEzfQ.feHERa1CiMcN-ARJmEmiz88hKIYyKkdKrGzu5z7AipY';

export function setGlobalVariable(value) {
    myGlobalVariable = value;
}

export function getGlobalVariable() {
    return myGlobalVariable;
}
