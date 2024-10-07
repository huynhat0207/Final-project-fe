import * as React from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import SecurityIcon from '@mui/icons-material/Security';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import InsightsIcon from '@mui/icons-material/Insights';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GetBackToTopButton from './WorkPlace/GetBackToTopButton';
import Img1 from './Img/homepage1.png';
import TextField from '@mui/material/TextField';
function HomePage() {
    return (
        <div className="bg-slate-200 flex flex-col mx-auto p-0 lg:max-w-1024">
            <div className="flex mt-28 gap-5">
                <div className="flex flex-col w-1/2 ml-0 leading-normal text-xl">
                    <div className="text-transparent font-sans font-bold text-5xl bg-clip-text bg-gradient-to-r from-vivid-blue to-vivid-pink">
                        Providing Data Analysis Solutions for Retailers
                        <br />
                    </div>
                    <div className="font-sans font-medium mt-8 leading-9">
                    Are you a retailer? <br/> 
                    Don't have experience or knowledge in data analysis? <br/>
                    Don't worry, visit our website, and we will provide you with the best BUSINESS ANALYSIS AND FORECASTING system.
                    {" "}
                    </div>
                    <button className="flex items-center border rounded-full self-start mt-5 gap-2 text-white font-normal py-3 px-8 whitespace-nowrap bg-gradient-to-tr from-vivid-blue to-vivid-pink">
                        <div className="font-sans grow">Get Started</div>
                        <ArrowForwardIcon/>
                    </button>
                </div>
                <div className="w-1/2 ml-5 flex">
                    <img
                        loading="lazy"
                        srcSet={Img1}
                        alt="Company Logo"
                        className="aspect-auto object-center w-full grow"
                    />
                </div>
            </div>
            <div className="flex rounded-500 bg-white mt-16 p-6 gap-5">
                <div className="leading-normal w-1/3 ml-0 border-r-2 border-vivid-blue">
                    <div className="m-auto pt-28 text-center w-full aspect-square font-sans text-vivid-blue text-4xl font-bold" id="my-section">
                        <p>About<br/>Us</p>
                    </div>
                </div>
                <div className="flex leading-normal w-2/3 ml-5 text-dark-gray self-stretch font-sans font-normal text-2xl items-center">
                    Our group consists of students from the Ho Chi Minh City University of Technology. With the goal of building a business analysis and forecasting system together, we joined forces to create this website.
                </div>
            </div>
            <div className="text-vivid-blue self-center mt-24 whitespace-nowrap font-bold text-4xl font-sans" id="my-service">Our Services</div>
            <div className="bg-white flex mt-16 justify-center items-center py-12 px-16">
                <div className="w-full gap-4 flex">
                    <div className="flex flex-col leading-normal w-3/5 ml-0">
                        <div className="flex flex-col self-stretch font-normal my-auto mx-0">
                            <div className="text-vivid-blue font-bold font-sans text-3xl">BUSINESS ANALYSIS</div>
                            <div className="text-medium-gray mt-6 text-2xl font-sans">
                                Data&Retailer is a business analytics support system specifically designed for retailers. With data in hand, users can easily perform analysis using our system.
                            </div>
                            <div className="rounded-100 border-vivid-blue text-vivid-blue border-2 self-start flex mt-8 gap-2 text-xl py-3 px-8">
                                <div className="font-sans grow">Learn More</div>
                                <ArrowForwardIcon/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col leading-normal w-2/5 ml-5">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/887f0d813db064ffc745d436faef492c0acb6ec175a1ddae513d249e03d131b1?apiKey=afa45b72ad7c46798aa3d2761c2357ac&"
                            alt="Company Logo"
                            className="aspect-6/5 object-center w-full grow"
                        />
                    </div>
                </div>
            </div>
            <div className="bg-white flex mt-16 justify-center items-center py-12 px-16">
                <div className="w-full gap-4 flex">
                    <div className="flex flex-col leading-normal w-2/5 ml-5">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/62c92fd235386c478c1a17fded6ce4dd9fe8902ee4db96a40a528a6645745bb1?apiKey=afa45b72ad7c46798aa3d2761c2357ac&"
                            alt="Company Logo"
                            className="aspect-6/5 object-center w-full grow"
                        />
                    </div>
                    <div className="flex flex-col leading-normal w-1/2 ml-5">
                        <div className="flex flex-col mt-4 grow font-normal">
                            <div className="text-vivid-blue font-bold text-3xl font-sans">FORECASTING</div>
                            <div className="text-medium-gray mt-6 text-2xl font-sans">
                            By understanding AI trends and the demand for business forecasting, we provide highly reliable forecasting solutions that support users in gaining insights into data trends and making the best decisions.
                            </div>
                            <div className="rounded-100 border-vivid-blue text-vivid-blue border-2 self-start flex mt-8 gap-2 text-xl py-3 px-8">
                                <div className="font-sans grow">Learn More</div>
                                <ArrowForwardIcon/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white flex mt-16 justify-center items-center py-12 px-16">
                <div className="w-full gap-4 flex">
                    <div className="flex flex-col leading-normal w-3/5 ml-0">
                        <div className="flex flex-col self-stretch font-normal my-auto mx-0">
                            <div className="text-vivid-blue font-bold font-sans text-3xl">DATA VISUALIZATION</div>
                            <div className="text-medium-gray mt-6 text-2xl font-sans">
                            The website will provide a convenient data visualization tool, helping users efficiently grasp information from their datasets.
                            </div>
                            <div className="rounded-100 border-vivid-blue text-vivid-blue border-2 self-start flex mt-8 gap-2 text-xl py-3 px-8">
                                <div className="font-sans grow">Learn More</div>
                                <ArrowForwardIcon/>
                            </div>
                        </div>
                    </div>
                    <div className="flex leading-normal w-2/5 ml-5">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8770e82f708422442301b6861fb234862f5b0a41f754e6e7457f6a5b8fb7216?apiKey=afa45b72ad7c46798aa3d2761c2357ac&"
                            alt="Company Logo"
                            className="aspect-6/5 object-center w-full grow"
                        />
                    </div>
                </div>
            </div>

            <div className="text-vivid-blue font-bold text-4xl font-sans self-center whitespace-nowrap mt-28 mr-0 mb-0 ml-16" id="my-advantages">The advantages of Data&Retailer</div>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{pt:4}} >
                <Grid item xs={2} sm={4} md={4} sx={{display:'flex', flexDirection:'column'}}>
                <SentimentSatisfiedAltIcon sx={{width:'100px', height:'100px', color:'#002B9A'}} />
                    <h3 className='text-vivid-blue text-2xl font-bold'>Statistics, as simple as never before.</h3>
                    <p>
                    Data&Retailer is a modern statistics software, with unique user-friendliness. Statistical analyses are done with just a few clicks, so Data&Retailer is perfect for statistics beginners and for professionals who want more flow in the user experience.                    
                    </p>
                </Grid>
                <Grid item xs={2} sm={4} md={4} sx={{display:'flex', flexDirection:'column'}}>
                    <OpenInBrowserIcon sx={{width:'100px', height:'100px', color:'#002B9A'}} />
                    <h3 className='text-vivid-blue text-2xl font-bold'>Directly in the browser, fully flexible.</h3>
                    <p>
                    Directly in the browser, fully flexible. Data&Retailer works directly in your web browser. You have no installation and maintenance effort whatsoever. Wherever and whenever you want to use Data&Retailer, just go to the website and get started.
                    </p>
                </Grid>
                <Grid item xs={2} sm={4} md={4} sx={{display:'flex', flexDirection:'column'}}>
                    <SecurityIcon sx={{width:'100px', height:'100px', color:'#002B9A'}} />
                    <h3 className='text-vivid-blue text-2xl font-bold'>Data security is a top priority.</h3>
                    <p>
                    All data that you insert and evaluate on Data&Retailer always remain on your end device. The data is not sent to any server or stored by us (not even temporarily). Furthermore, we do not pass on your data to third parties in order to analyze your user behavior.
                    </p>
                </Grid>
                <Grid item xs={2} sm={4} md={4} sx={{display:'flex', flexDirection:'column'}}>
                <InsightsIcon sx={{width:'100px', height:'100px', color:'#002B9A'}} />
                <h3 className='text-vivid-blue text-2xl font-bold'>Charts, simple and clear.</h3>
                    <p>
                    With Data&Retailer data visualization is fun! Here you can easily create meaningful charts that optimally illustrate your results.
                    </p>
                </Grid>
                <Grid item xs={2} sm={4} md={4} sx={{display:'flex', flexDirection:'column'}}>
                    <TipsAndUpdatesIcon sx={{width:'100px', height:'100px', color:'#002B9A'}} />
                    <h3 className='text-vivid-blue text-2xl font-bold'>Many tutorials with simple examples.</h3>
                    <p>
                    In order to facilitate the introduction, Data&Retailer offers a large number of free tutorials with focused explanations in simple language. We explain the statistical background of the methods and give step-by-step explanations for performing the analyses in the statistics calculator.
                    </p>
                </Grid>
                <Grid item xs={2} sm={4} md={4} sx={{display:'flex', flexDirection:'column'}}>
                <QueryStatsIcon sx={{width:'100px', height:'100px', color:'#002B9A'}} />
                    <h3 className='text-vivid-blue text-2xl font-bold'>Simple prediction with your data </h3>
                    <p>
                    Data&Retailer will support you in making actual predictions using your own data. By uploading your data, the system will provide the most accurate predictions with high reliability that can be derived from the data.
                    </p>
                </Grid>
            </Grid>
            
            <div className="bg-slate-100 mt-20 py-16 px-12 gap-5 flex">
                <div>
                    <div className="w-200 h-200 m-5 bg-translucent-blue rounded-full aspect-square mt-4"/>
                </div>
                <div className="flex flex-col w-3/5 ml-5">
                    <div className="text-vivid-blue self-center font-bold text-4xl font-sans">Contact Us</div>
                    <form className="flex flex-col space-y-4 mt-10">
                        <TextField label='Full Name' variant="outlined"/>
                        <TextField label='Email Address' variant="outlined"/>
                        <TextField label='Phone Number' variant="outlined"/>
                        <TextField 
                        label='Have anything to say?' 
                        variant="outlined"
                        multiline
                        rows={4}
                        />
                        <button className="text-white font-sans font-medium items-center self-center rounded-md bg-vivid-blue w-250 mt-4 max-w-full py-3 px-14 text-center">Send</button>
                    </form>
                </div>
                <div>
                    <div className="w-200 h-200 m-5 bg-translucent-blue rounded-full aspect-square mt-96"/>
                </div>
            </div>
            <div className="bg-charcoal flex mt-16 justify-between gap-5 text-xl text-slate-100 font-normal py-10 px-16">
                <div className="font-sans grow basis-auto">Data&Retailer</div>
                <div className="font-sans grow basis-auto">Data&Retailer , 2024 © All Rights Reserved</div>
            </div>
            <div className='fixed bottom-0 right-5 z-50'>
                <GetBackToTopButton/>
            </div>
        </div>
    );
}
export default HomePage;


