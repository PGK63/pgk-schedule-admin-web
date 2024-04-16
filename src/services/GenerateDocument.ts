import $api, { API_URL } from "../http";

export default class GenerateDocument {
  static downloadFile = async (id: number) => {
    const response = await fetch(`${API_URL}/requests/generate-document?reqId=${id}`,{
        method:'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            Token: '6f065151-3bc8-434b-8271-d415feeb5f8f'
        }
    });
    const blob = await response.blob();
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(blob)
    a.click();
    a.remove();
  }
}
