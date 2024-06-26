import { Button, Box } from "@mui/material"
function NotFound() {
    function getPath(){
        var url = window.location.href;
        var arr = url.split("/");
        var result = arr[0] + "//" + arr[2] + '/home';
        return result;
    }
    return (
    <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', width:'100%', height:'auto', marginTop:'40px'}}>
        <Box style={{textAlign: 'center', maxWidth: 'fit-content'}}>
            <h2 style={{fontWeight:'bold', fontSize: '100px', color:'#D6008D'}}>404</h2>
            <p style={{fontWeight:'bold', fontSize: '20px', color:'#D6008D'}}>
            Sorry, we couldn't find this page.
            </p>
            <p style={{color:'#002B9A'}}>
            But dont worry, you can find plenty of other things on our homepage.
            </p>
            <Button variant="contained" href={getPath()}>Back to Homepage</Button>
        </Box>
        
    </div>
    )
}
export default NotFound