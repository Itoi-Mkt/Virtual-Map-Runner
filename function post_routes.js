function post_routes(){
    // fetchでDBにPOST
    //DBに送るデータの骨子
    const post_data = {
    key1: "data1",
    key2: "data2",
    key3: 3,
    w_day: "2022-04-04",
    w_dis: 4444.44
    };


    fetch('/routes', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCsrfToken()
        },
        body : JSON.stringify(post_data),
    })
    .then(function(response){
      const response_message = response.status + ':' + response.statusText
      console.log(response_message);
    });


}