import logo from './logo.svg';
import './App.css';
import React, { useState,useEffect } from 'react';
import { Signature, ethers } from "ethers";
import axios from 'axios';
import FormData from 'form-data';
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';
const { utils } = ethers;


const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1OTMxZWQwYS00NGU2LTQ0YWEtYWUwNy0wNGUzNWUzNjdkYjciLCJlbWFpbCI6InJ1cG9raGFzYW43ODlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjUxOGI2MmE0OTYzMGEyMzVjNzdhIiwic2NvcGVkS2V5U2VjcmV0IjoiMTgxY2NiZWUzYjBlMTMwN2UxN2JiOTg4MWQyY2ViODBkYmY0OTdmZDhjZDFlMTRlNzdjOGU1NmUwZTFjMDg0NyIsImlhdCI6MTcwNzgxNjY1N30.2NUGfQEfzSXya_qCgPjp1-FCpS9QhtFf7EahiSpWrfY';

function App() {
  var [isConnected, setConnected] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [userName, setuserName] = useState("");
  const [userType,setUserType] = useState("");
  const [isNidCard,setNidCard] = useState(false);
  const [isNidCardRequest,setNidCardRequest] = useState(false);
  const [isLiCard,setLiCard] = useState(false);
  const [isEduCard,setEduCard] = useState(false);
  const [isPassCard,setPassCard] = useState(false);
  const [isVerify,setVerify] = useState(false);
  const [isQrVerify,setQrVerify] = useState(false);
  const [isGovt,setGovt] = useState(false);
  const [isIssuer,setIssuer] = useState(false);
  const [start,setStart] = useState();
  const [end,setEnd] = useState();


  const handleRefresh = () => {
    window.location.reload();
  };

  async function connect(walletAddress)
  {
    // console.log("TIMWEEEEEEEEEEE",performance.now());
    // setStart(performance.now());
    const network = "goerli";
      const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
      const provider2 = new ethers.AlchemyProvider(
        network,
      demo
      );
    const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
    const userABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"getUser","outputs":[{"components":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"string","name":"userType","type":"string"}],"internalType":"struct info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_user","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"string","name":"_tpye","type":"string"}],"name":"setUser","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const user = new ethers.Contract('0xEbc2E39C43512eE8b14398193AF931296baA007b',userABI,wallet);
    var check = await user.checkRegistered(walletAddress);
    

    if(check)
    {
      setRegistered(true);
      var name =  await user.getUser(walletAddress);
      console.log(name);
      setuserName(name[0]);
      setUserType(name[2]);

    }
   
  
   
    if(walletAddress == "0x4f8141edc15f19f41af221d91954a59fab145708")
    {
      setGovt(true);
      setRegistered(true);
      setuserName("Govt");
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer2 = await provider.getSigner();
      // const addressSigner = await signer2.getAddress();
      // console.log("provider",provider,signer2);
      // try{
      //   const signature = await window.ethereum.request({
      //     method: 'personal_sign',
      //     params: ["hello", addressSigner],
      //   });
      //   console.log("signature",signature);
      // }catch (error) {
      //   console.error('Error signing message:', error.message);
      // }
      
    }

    const issuerABI = [{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getIssuer","outputs":[{"components":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"string","name":"userType","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct issuerInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_userName","type":"string"},{"internalType":"string","name":"_userType","type":"string"},{"internalType":"address","name":"_address","type":"address"}],"name":"setIssuer","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const issuer = new ethers.Contract('0x0DE272087A362baF43FFD3e4DDfc634156A81acC',issuerABI,wallet);
    var check2 = await issuer.checkStatus(walletAddress);

    if(check2)
    {
      
      var issuerInfo = await issuer.getIssuer(walletAddress);
      console.log(issuerInfo);
      if(issuerInfo[1]=='issuer')
      {
        setuserName(issuerInfo[0]);
        setUserType(issuerInfo[1]);
        setIssuer(true);
        setRegistered(true);
      }
    }
   
    setConnected(true);
  //  // handleRefresh();
  //  setEnd(performance.now());
  //  console.log("TIMWEEEEEEEEEEE",performance.now());
  //  console.log("TIME",end-start);

  }
  const disconnect = ()=>
  {
    setConnected(false);
    setNidCard(false);
    setLiCard(false);
    setEduCard(false);
    setPassCard(false);
    setRegistered(false);
    setGovt(false);
    setVerify(false);
    setQrVerify(false);
    handleRefresh();
    
    console.log("hello",isConnected,isGovt)
  }
 

  async function register()
  {
    var error = document.getElementById('errorMessage2');
    var name = document.getElementById('UserName').value;
    console.log(name);
    setuserName(name);
   
    if(!name)
    {
      error.innerHTML = "Please fill the username";
      error.style.display = "block";
      return;
    }
    else{
      const network = "goerli";
      const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
      const provider2 = new ethers.AlchemyProvider(
        network,
      demo
      );
      const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
      const userABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"getUser","outputs":[{"components":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"string","name":"userType","type":"string"}],"internalType":"struct info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_user","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"string","name":"_tpye","type":"string"}],"name":"setUser","outputs":[],"stateMutability":"nonpayable","type":"function"}];
      const user = new ethers.Contract('0xEbc2E39C43512eE8b14398193AF931296baA007b',userABI,wallet);
      var check = await user.checkRegistered(walletAddress);

      if(!check)
      {
        await user.setUser(name,walletAddress,selectedOption);
        console.log("Data is saved!!!");
        setRegistered(true);
      }
      else{
        error.innerHTML = "Already Registered!!!!!!!!";
        error.style.display = "block";
        return;
      }
      document.getElementById('UserName').innerHTML = "";

    }
   
    
   
  }

  async function registerIssuer()
  {
    var issuerName = document.getElementById('issuerName').value;
    var issuerAddress = document.getElementById('walletAddress').value;
    var errorMsg = document.getElementById('errorMessage3');

    if(!issuerName && !issuerAddress)
    {
      errorMsg.innerHTML = "Error!!Please fill all the field";
      errorMsg.style.display = "block";
      return;

    }
    setUserType('issuer');

    const network = "goerli";
    const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
    const provider2 = new ethers.AlchemyProvider(
      network,
    demo
    );
    const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
    const issuerABI = [{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getIssuer","outputs":[{"components":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"string","name":"userType","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct issuerInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_userName","type":"string"},{"internalType":"string","name":"_userType","type":"string"},{"internalType":"address","name":"_address","type":"address"}],"name":"setIssuer","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const issuer = new ethers.Contract('0x0DE272087A362baF43FFD3e4DDfc634156A81acC',issuerABI,wallet);
    var check = await issuer.checkStatus(walletAddress);

    if(check)
    {
      errorMsg.innerHTML = "Already Registered!!!!!!!!";
      errorMsg.style.display = "block";
      return;
    }
    else{
      await issuer.setIssuer(issuerName,'issuer',issuerAddress);
      console.log("Data is saved!!!");
      document.getElementById('issuerName').innerHTML = "";
      document.getElementById('walletAddress').innerHTML = "";
    }


  }

  async function toggleCheckbox(id)
  {
    var nidCard = false;
    console.log(id);
      const checkboxes = document.querySelectorAll('.option-checkbox');
      
      checkboxes.forEach(checkbox => {
          if (checkbox.id === id) {
              checkbox.checked = true;
              if(checkbox.id ==='nidCard')
              {
                nidCard = true;
                setNidCard(true);
                setLiCard(false);
                setEduCard(false);
                setPassCard(false);
                setVerify(false);
                setQrVerify(false);
              }
              else if(checkbox.id === 'liCard')
              {
                nidCard = false;
                setNidCard(false);
                setLiCard(true);
                setEduCard(false);
                setPassCard(false);
                setVerify(false);
                setQrVerify(false);

              }
              else if(checkbox.id === 'eduCard')
              {
                nidCard = false;
                setNidCard(false);
                setLiCard(false);
                setEduCard(true);
                setPassCard(false);
                setVerify(false);
                setQrVerify(false);
              }
              else if(checkbox.id === 'passCard')
              {
                nidCard = false;
                setNidCard(false);
                setLiCard(false);
                setEduCard(false);
                setPassCard(true);
                setVerify(false);
                setQrVerify(false);
              }
              else if(checkbox.id === 'verify')
              {
                nidCard = false;
                setNidCard(false);
                setLiCard(false);
                setEduCard(false);
                setPassCard(false);
                setVerify(true);
                setQrVerify(false);
              }
              else if(checkbox.id === 'qrverify')
              {
                nidCard = false;
                setNidCard(false);
                setLiCard(false);
                setEduCard(false);
                setPassCard(false);
                setVerify(false);
                setQrVerify(true);
              }


          } else {
              checkbox.checked = false;
          }
      });
      if(nidCard)
      {
        console.log("RUPOK");
        
        const network = "goerli";
        const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
        const provider2 = new ethers.AlchemyProvider(
          network,
        demo
        );
        const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
        const nidABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkAddressStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid","outputs":[{"components":[{"internalType":"string","name":"imageFrontUrl","type":"string"},{"internalType":"string","name":"imageBackUrl","type":"string"},{"internalType":"string","name":"nidNo","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"nationality","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"}],"internalType":"struct nidInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid2","outputs":[{"components":[{"internalType":"string","name":"f_name","type":"string"},{"internalType":"string","name":"m_name","type":"string"},{"internalType":"string","name":"permanentAddress","type":"string"},{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct nidInfo2","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid3","outputs":[{"components":[{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct nidInfo3","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getNidArrayElement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNidArrayLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getNidNo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nidNoArray","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_imageUrlFront","type":"string"},{"internalType":"string","name":"_imageUrlBack","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_nationality","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"}],"name":"setNid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_f_name","type":"string"},{"internalType":"string","name":"_m_name","type":"string"},{"internalType":"string","name":"_permanentAddress","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setNid2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signerAddress","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setNid3","outputs":[],"stateMutability":"nonpayable","type":"function"}];
        const nid = new ethers.Contract('0x9361F0002ae98cB042928Ae90d1B08fa6C3dc1C7',nidABI,wallet);

        const check = await nid.checkAddressStatus(walletAddress);
        console.log("check",check);

        if(check)
        {
          const x = document.getElementById('nidForm');
          if(x!=null)
          {
            x.style.display = 'none';
          }
          setNidCardRequest(true);
          getNIDInfo();
        }
        else{
          setNidCardRequest(false);
        }

      }
  }
  var obj = {
    imgFront:"",
    imgBack:"",
    nid:"",
    name:"",
    f_name:"",
    m_name:"",
    p_addr:"",
    dob:"",
    country:"",
    signer:"",
  };

  async function toggleShareCheckbox(id)
  {
  
    console.log(id);
    const checkboxes = document.querySelectorAll('.shareCheckBox');
    
   
    checkboxes.forEach(checkbox => {
        if(checkbox.id === id && id==='imageFront')
        {
          if(checkbox.checked)
          {
            const img = document.getElementById('image').src;
            obj.imgFront=img;
            const img2 = document.getElementById('image2').src;
            obj.imgBack=img2;
          }
          else{
            obj.imgFront="";
          }
         
        }
        if(checkbox.id === id && id==='imageBack')
        {
          if(checkbox.checked)
          {
            const img = document.getElementById('image2').src;
            obj.imgBack=img;
           
          }
          else{
            obj.imgBack="";
          }
         
        }
        if(checkbox.id === id && id==='option1')
        {
          if(checkbox.checked)
          {
            const val = document.getElementById('option1').value;
            obj.nid=val;
           
          }
          else{
            obj.nid="";
          }
         
        }
        if(checkbox.id === id && id==='option2')
        {
          if(checkbox.checked)
          {
            const val = document.getElementById('option2').value;
            obj.name=val;
           
          }
          else{
            obj.name="";
          }
         
        }
        if(checkbox.id === id && id==='option3')
        {
          if(checkbox.checked)
          {
            const val = document.getElementById('option3').value;
            obj.f_name=val;
           
          }
          else{
            obj.f_name="";
          }
         
        }
        if(checkbox.id === id && id==='option4')
        {
          if(checkbox.checked)
          {
            const val = document.getElementById('option4').value;
            obj.m_name=val;
           
          }
          else{
            obj.m_name="";
          }
         
        }
        if(checkbox.id === id && id==='option5')
        {
          if(checkbox.checked)
          {
            const val = document.getElementById('option5').value;
            obj.p_addr=val;
           
          }
          else{
            obj.p_addr="";
          }
         
        }
        if(checkbox.id === id && id==='option6')
        {
          if(checkbox.checked)
          {
            const val = document.getElementById('option6').value;
            obj.dob=val;
           
          }
          else{
            obj.dob="";
          }
         
        }
        if(checkbox.id === id && id==='option7')
        {
          if(checkbox.checked)
          {
            const val = document.getElementById('option7').value;
            obj.country=val;
           
          }
          else{
            obj.country="";
          }
         
        }
        if(checkbox.id === id && id==='option8')
        {
          if(checkbox.checked)
          {
            const val = document.getElementById('option8').value;
            obj.signer=val;
           
          }
          else{
            obj.signer="";
          }
         
        }

    });

    console.log(obj);

  }
  async function requestAccount(){
    console.log("Account Connecting");
    if(window.ethereum)
    {
      console.log("Account Detected");
      try{
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWalletAddress(accounts[0]);
        console.log("Account Connected");
        connect(accounts[0]);
        
      }catch(error)
      {
        console.log(error);
      }
    }
    else{
      console.log("Meta mask not detected");
    }

  } 

  

  const [selectedFrontFile, setSelectedFrontFile] = useState(null);
  const [selectedBackFile, setSelectedBackFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');
  const [ipfsHashFront, setIpfsHashFront] = useState('');
  const [ipfsHashBack, setIpfsHashBack] = useState('');

  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  const pinFileToIPFS = async () => {
    console.log( `${PINATA_JWT}`);
    //console.log(selectedFile);
    var errorMessage = document.getElementById("errorMessage");
   
    try {
      if (!selectedFrontFile) {
        errorMessage.innerHTML = "Error!!Please choose the front NID image";
        errorMessage.style.display = "block";
        return;
      }
      if (!selectedBackFile) {
        errorMessage.innerHTML = "Error!!Please choose the back NID image";
        errorMessage.style.display = "block";
        return;
      }
      const nidNo = document.getElementById('nidNo').value;
      const name = document.getElementById('name').value;
      const f_name = document.getElementById('f_name').value;
      const m_name = document.getElementById('m_name').value;
      const dob = document.getElementById('dob').value;
      const p_address = document.getElementById('p_address').value;
      const nationality = document.getElementById('nationality').value;

      if(!nidNo)
      {
        errorMessage.innerHTML = "Error!!Please fill the NID no";
        errorMessage.style.display = "block";
        return;
      }
      if(!name)
      {
        errorMessage.innerHTML = "Error!!Please fill the name";
        errorMessage.style.display = "block";
        return;
      }
      if(!f_name)
      {
        errorMessage.innerHTML = "Error!!Please fill the father name";
        errorMessage.style.display = "block";
        return;
      }
      if(!m_name)
      {
        errorMessage.innerHTML = "Error!!Please fill the mother name";
        errorMessage.style.display = "block";
        return;
      }
      if(!dob)
      {
        errorMessage.innerHTML = "Error!!Please select the date of birth";
        errorMessage.style.display = "block";
        return;
      }
      if(!p_address)
      {
        errorMessage.innerHTML = "Error!!Please fill the parmanent address";
        errorMessage.style.display = "block";
        return;
      }
      if(!nationality)
      {
        errorMessage.innerHTML = "Error!!Please fill the nationality";
        errorMessage.style.display = "block";
        return;
      }

      errorMessage.innerHTML = "";
      errorMessage.style.display = "none";


      const data = new FormData();
      data.append('file', selectedFrontFile);
      data.append('pinataOptions', '{"cidVersion": 0}');
      data.append('pinataMetadata', `{"name": "${nidNo}_front"}`);


      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}` // Use REACT_APP_ prefix for environment variables in React
        }
      });
      setIpfsHashFront(response.data.IpfsHash);
      //console.log(response.data);
      //console.log(`View the file here: https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
      const imageHashFront  = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
     
      const data2 = new FormData();
      data2.append('file', selectedBackFile);
      data2.append('pinataOptions', '{"cidVersion": 0}');
      data2.append('pinataMetadata', `{"name": "${nidNo}_back"}`);

      const response2 = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data2, {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}` // Use REACT_APP_ prefix for environment variables in React
        }
      });
      setIpfsHashBack(response2.data.IpfsHash);
      //console.log(response2.data);
      //console.log(`View the file here: https://gateway.pinata.cloud/ipfs/${response2.data.IpfsHash}`);
      const imageHashBack  = `https://gateway.pinata.cloud/ipfs/${response2.data.IpfsHash}`;


    const network = "goerli";
    const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
    const provider2 = new ethers.AlchemyProvider(
      network,
    demo
    );
    const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
    const nidABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkAddressStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid","outputs":[{"components":[{"internalType":"string","name":"imageFrontUrl","type":"string"},{"internalType":"string","name":"imageBackUrl","type":"string"},{"internalType":"string","name":"nidNo","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"nationality","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"}],"internalType":"struct nidInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid2","outputs":[{"components":[{"internalType":"string","name":"f_name","type":"string"},{"internalType":"string","name":"m_name","type":"string"},{"internalType":"string","name":"permanentAddress","type":"string"},{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct nidInfo2","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid3","outputs":[{"components":[{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct nidInfo3","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getNidArrayElement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNidArrayLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getNidNo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nidNoArray","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_imageUrlFront","type":"string"},{"internalType":"string","name":"_imageUrlBack","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_nationality","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"}],"name":"setNid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_f_name","type":"string"},{"internalType":"string","name":"_m_name","type":"string"},{"internalType":"string","name":"_permanentAddress","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setNid2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signerAddress","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setNid3","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const nid = new ethers.Contract('0x9361F0002ae98cB042928Ae90d1B08fa6C3dc1C7',nidABI,wallet);

    const check = await nid.checkAddressStatus(walletAddress);
    const check2 = await nid.checkStatus(nidNo);
    // console.log(check,check2,imageHashFront,imageHashBack);
    if(!check && !check2)
    {

      await nid.setNid(imageHashFront,imageHashBack,nidNo,name,dob,nationality,walletAddress,'0x08daAaad8A50A90feF25fbDA7BDd4fB1B1F8DD5f');
      await nid.setNid2(f_name,m_name,p_address,nidNo,walletAddress);
      console.log("NID data is saved!!!");
      setNidCardRequest(true);
      getNIDInfo();
  
    }

    } catch (error) {
      console.error(error);
    }
  };


  
  

  async function getNIDInfo()
  {
    console.log("getNIdInfo is called");
    const network = "goerli";
    const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
    const provider2 = new ethers.AlchemyProvider(
      network,
    demo
    );
    const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
    const nidABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkAddressStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid","outputs":[{"components":[{"internalType":"string","name":"imageFrontUrl","type":"string"},{"internalType":"string","name":"imageBackUrl","type":"string"},{"internalType":"string","name":"nidNo","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"nationality","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"}],"internalType":"struct nidInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid2","outputs":[{"components":[{"internalType":"string","name":"f_name","type":"string"},{"internalType":"string","name":"m_name","type":"string"},{"internalType":"string","name":"permanentAddress","type":"string"},{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct nidInfo2","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid3","outputs":[{"components":[{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct nidInfo3","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getNidArrayElement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNidArrayLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getNidNo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nidNoArray","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_imageUrlFront","type":"string"},{"internalType":"string","name":"_imageUrlBack","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_nationality","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"}],"name":"setNid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_f_name","type":"string"},{"internalType":"string","name":"_m_name","type":"string"},{"internalType":"string","name":"_permanentAddress","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setNid2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signerAddress","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setNid3","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const nid = new ethers.Contract('0x9361F0002ae98cB042928Ae90d1B08fa6C3dc1C7',nidABI,wallet);

    const check = await nid.checkAddressStatus(walletAddress);
    const nidNo = await nid.getNidNo(walletAddress);

    if(check)
    {
      const [info, info2, result] = await Promise.all([
        nid.getNid(nidNo),
        nid.getNid2(nidNo),
        nid.getNid3(nidNo)
      ]);

   
      const img = document.getElementById('image');
      img.setAttribute('src',info[0]);
      const img2 = document.getElementById('image2');
      img2.setAttribute('src',info[1]);
      document.getElementById("labelText1").innerText = "NID No: " + info[2];
      document.getElementById("option1").value = info[2];
      document.getElementById("labelText2").innerText = "Name: " + info[3];
      document.getElementById("option2").value = info[3];
      document.getElementById("labelText3").innerText = "Father Name: " + info2[0];
      document.getElementById("option3").value = info2[0];
      document.getElementById("labelText4").innerText = "Mother Name: " + info2[1];
      document.getElementById("option4").value = info2[1];
      document.getElementById("labelText5").innerText = "Permanent Address: " + info2[2];
      document.getElementById("option5").value = info2[2];
      document.getElementById("labelText6").innerText = "Date of Birth: " + info[4];
      document.getElementById("option6").value = info[4];
      document.getElementById("labelText7").innerText = "Nationality: " + info[5];
      document.getElementById("option7").value = info[5];
      document.getElementById("labelText8").innerText = "Signer: " + info[7];
      document.getElementById("option8").value = info[7];
      
      if (result.nid_No === "" && result.walletAddress === "0x0000000000000000000000000000000000000000" && result.signer === "0x0000000000000000000000000000000000000000" && result.signature === "0x") {
         document.getElementById("labelText9").innerText = "Status: Not Signed";
       }
       else {
        document.getElementById("labelText9").innerText = "Status: Signed";
       }

     

    }
  

  }

  // const retrieveFileFromIPFS = async () => {
  //   try {
  //     if (!ipfsHash) {
  //       console.error('No IPFS hash available.');
  //       return;
  //     }
  //     const img = document.getElementById('imageId');

  //     img.setAttribute('src',`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);

     
  //   } catch (error) {
  //     console.error('Error retrieving file from IPFS:', error);
  //   }
  // };
  
  async function seePendingList()
  {
   

    const network = "goerli";
    const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
    const provider2 = new ethers.AlchemyProvider(
      network,
    demo
    );
    const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
    const nidABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkAddressStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid","outputs":[{"components":[{"internalType":"string","name":"imageFrontUrl","type":"string"},{"internalType":"string","name":"imageBackUrl","type":"string"},{"internalType":"string","name":"nidNo","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"nationality","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"}],"internalType":"struct nidInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid2","outputs":[{"components":[{"internalType":"string","name":"f_name","type":"string"},{"internalType":"string","name":"m_name","type":"string"},{"internalType":"string","name":"permanentAddress","type":"string"},{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct nidInfo2","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid3","outputs":[{"components":[{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct nidInfo3","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getNidArrayElement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNidArrayLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getNidNo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nidNoArray","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_imageUrlFront","type":"string"},{"internalType":"string","name":"_imageUrlBack","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_nationality","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"}],"name":"setNid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_f_name","type":"string"},{"internalType":"string","name":"_m_name","type":"string"},{"internalType":"string","name":"_permanentAddress","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setNid2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signerAddress","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setNid3","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const nid = new ethers.Contract('0x9361F0002ae98cB042928Ae90d1B08fa6C3dc1C7',nidABI,wallet);

    const len = await nid.getNidArrayLength();
   

    let cardList = document.getElementById("cardList");
    cardList.innerHTML = "";
   
   
    for(let i=0;i<len;i++)
    {
       let x = await nid.getNidArrayElement(i);
       console.log(x);
       const result = await nid.getNid3(x);
       let card = document.createElement('div');
       card.classList.add('card');
       if(result.signature === "0x")
       {
         card.innerHTML = x;
         cardList.appendChild(card);
       
       }
       
    }
    

      // const [info, info2, result] = await Promise.all([
      //   nid.getNid(nidNo),
      //   nid.getNid2(nidNo),
      //   nid.getNid3(nidNo)
      // ]);


  }
  async function seeSignedList()
  {
    const network = "goerli";
    const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
    const provider2 = new ethers.AlchemyProvider(
      network,
    demo
    );
    const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
    const nidABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkAddressStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid","outputs":[{"components":[{"internalType":"string","name":"imageFrontUrl","type":"string"},{"internalType":"string","name":"imageBackUrl","type":"string"},{"internalType":"string","name":"nidNo","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"nationality","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"}],"internalType":"struct nidInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid2","outputs":[{"components":[{"internalType":"string","name":"f_name","type":"string"},{"internalType":"string","name":"m_name","type":"string"},{"internalType":"string","name":"permanentAddress","type":"string"},{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct nidInfo2","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid3","outputs":[{"components":[{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct nidInfo3","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getNidArrayElement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNidArrayLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getNidNo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nidNoArray","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_imageUrlFront","type":"string"},{"internalType":"string","name":"_imageUrlBack","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_nationality","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"}],"name":"setNid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_f_name","type":"string"},{"internalType":"string","name":"_m_name","type":"string"},{"internalType":"string","name":"_permanentAddress","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setNid2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signerAddress","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setNid3","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const nid = new ethers.Contract('0x9361F0002ae98cB042928Ae90d1B08fa6C3dc1C7',nidABI,wallet);

    const len = await nid.getNidArrayLength();
   

    let cardList = document.getElementById("cardList2");
    cardList.innerHTML = "";
   
   
    for(let i=0;i<len;i++)
    {
       let x = await nid.getNidArrayElement(i);
       console.log(x);
       const result = await nid.getNid3(x);
       let card = document.createElement('div');
       card.classList.add('card');
       if(result.signature != "0x")
       {
         card.innerHTML = x;
         cardList.appendChild(card);
       
       }
       
    }
    
  }
  const [isSigned,setIsSigned] = useState(false);
  const [isCheckNidClick,setIsCheckNidClick] = useState(false);
  const [checkNid,setCheckNid] = useState(null);

  async function checkNidCard()
  {
    //zkpShare();
    setIsCheckNidClick(true);
    const x = document.getElementById('searchNidNo');
    const nidNo = x.value;
    if(!nidNo)
    {
      console.log("Error!!Please fill the NID no");
      setIsCheckNidClick(false);
      return;
    }
    setCheckNid(nidNo);
    x.value = "";

    const network = "goerli";
    const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
    const provider2 = new ethers.AlchemyProvider(
      network,
    demo
    );
    const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
    const nidABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkAddressStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid","outputs":[{"components":[{"internalType":"string","name":"imageFrontUrl","type":"string"},{"internalType":"string","name":"imageBackUrl","type":"string"},{"internalType":"string","name":"nidNo","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"nationality","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"}],"internalType":"struct nidInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid2","outputs":[{"components":[{"internalType":"string","name":"f_name","type":"string"},{"internalType":"string","name":"m_name","type":"string"},{"internalType":"string","name":"permanentAddress","type":"string"},{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct nidInfo2","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid3","outputs":[{"components":[{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct nidInfo3","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getNidArrayElement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNidArrayLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getNidNo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nidNoArray","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_imageUrlFront","type":"string"},{"internalType":"string","name":"_imageUrlBack","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_nationality","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"}],"name":"setNid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_f_name","type":"string"},{"internalType":"string","name":"_m_name","type":"string"},{"internalType":"string","name":"_permanentAddress","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setNid2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signerAddress","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setNid3","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const nid = new ethers.Contract('0x9361F0002ae98cB042928Ae90d1B08fa6C3dc1C7',nidABI,wallet);


      const [info, info2, result] = await Promise.all([
        nid.getNid(nidNo),
        nid.getNid2(nidNo),
        nid.getNid3(nidNo)
      ]);

   
      const img = document.getElementById('img');
      img.setAttribute('src',info[0]);
      const img2 = document.getElementById('img2');
      img2.setAttribute('src',info[1]);
      document.getElementById("l1").innerText = "NID No: " + info[2];
      document.getElementById("l2").innerText = "Name: " + info[3];
      document.getElementById("l3").innerText = "Father Name: " + info2[0];
      document.getElementById("l4").innerText = "Mother Name: " + info2[1];
      document.getElementById("l5").innerText = "Permanent Address: " + info2[2];
      document.getElementById("l6").innerText = "Date of Birth: " + info[4];
      document.getElementById("l7").innerText = "Nationality: " + info[5];
      document.getElementById("l8").innerText = "Signer: " + info[7];
      
      if (result.nid_No === "" && result.walletAddress === "0x0000000000000000000000000000000000000000" && result.signer === "0x0000000000000000000000000000000000000000" && result.signature === "0x") {
         document.getElementById("l9").innerText = "Status: Not Signed";
         setIsSigned(false);
       }
       else {
        console.log("HI\\\\\\\\\\\\\\");
        document.getElementById("l9").innerText = "Status: Signed";
        setIsSigned(true);
       }



  }
  async function signBtn()
  {
    
    const network = "goerli";
        const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
        const provider2 = new ethers.AlchemyProvider(
          network,
        demo
        );
    
    const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
    setIsSigned(true);
    const signatureABI = [{"inputs":[{"internalType":"bytes32","name":"_messageHash","type":"bytes32"}],"name":"getEthSignMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"string","name":"_message","type":"string"}],"name":"getMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_ethSignedMessageHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"recover","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_signer","type":"address"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"}];
    const signatureV = new ethers.Contract('0x2B66dBD3B87C882EC6079AeD4240fd006109307F',signatureABI,wallet);
    const nidABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkAddressStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid","outputs":[{"components":[{"internalType":"string","name":"imageFrontUrl","type":"string"},{"internalType":"string","name":"imageBackUrl","type":"string"},{"internalType":"string","name":"nidNo","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"nationality","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"}],"internalType":"struct nidInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid2","outputs":[{"components":[{"internalType":"string","name":"f_name","type":"string"},{"internalType":"string","name":"m_name","type":"string"},{"internalType":"string","name":"permanentAddress","type":"string"},{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct nidInfo2","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid3","outputs":[{"components":[{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct nidInfo3","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getNidArrayElement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNidArrayLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getNidNo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nidNoArray","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_imageUrlFront","type":"string"},{"internalType":"string","name":"_imageUrlBack","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_nationality","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"}],"name":"setNid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_f_name","type":"string"},{"internalType":"string","name":"_m_name","type":"string"},{"internalType":"string","name":"_permanentAddress","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setNid2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signerAddress","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setNid3","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const nid = new ethers.Contract('0x9361F0002ae98cB042928Ae90d1B08fa6C3dc1C7',nidABI,wallet);
   
    if(checkNid)
    {
      const [info, info2, result] = await Promise.all([
        nid.getNid(checkNid),
        nid.getNid2(checkNid),
        nid.getNid3(checkNid)
      ]);

      console.log(info,info2,result);
   
      let msg = "";
      msg = msg.concat(info[0],info[1],info[2],info[3],info2[0],info2[1],info2[2],info[4],info[5],info[6]);
      console.log(msg);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer2 = await provider.getSigner();
      const addr2 = await signer2.getAddress();

      try{
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [await signatureV.getMessageHash(msg), addr2],
        });

        console.log("Signature",signature);
        await nid.setNid3(checkNid,info[6],addr2,signature);
        console.log("Signature is saved!!");
      }catch (error) {
        console.error('Error signing message:', error.message);
      }
      

    }
    else{
      console.log("CheckNid is Null!!!");
    }
    
  }
  async function shareInfo()
  {
   
    let sw = document.getElementById('shareWallet');
    var shareWallet = sw.value;

   

    if(!shareWallet)
    {
      console.log('Share Wallet Address is Empty!!');
      return;
    }
    sw.value = "";

    if(obj.imgFront && obj.imgBack)
    {
      const network = "goerli";
      const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
      const provider2 = new ethers.AlchemyProvider(
        network,
      demo
      );
      const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
      const shareABI = [{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"checkShareStatus","outputs":[{"components":[{"internalType":"bool","name":"share","type":"bool"},{"internalType":"string","name":"image_front","type":"string"},{"internalType":"string","name":"image_back","type":"string"},{"internalType":"string","name":"message","type":"string"},{"internalType":"address","name":"shareAddress","type":"address"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct Info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"getShareData","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"getShareWalletData","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_shareAdddress","type":"address"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setShareData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_share","type":"bool"},{"internalType":"string","name":"_imageFront","type":"string"},{"internalType":"string","name":"_imageBack","type":"string"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"address","name":"_shareAddress","type":"address"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setShareInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_shareAddress","type":"address"}],"name":"setShareWalletData","outputs":[],"stateMutability":"nonpayable","type":"function"}];
      const share = new ethers.Contract('0x4f300b85D81C939aeA9CFCf760206322B3d647CA',shareABI,wallet);

      const flag = await share.checkShareStatus(shareWallet);

     
      const nidABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkAddressStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid","outputs":[{"components":[{"internalType":"string","name":"imageFrontUrl","type":"string"},{"internalType":"string","name":"imageBackUrl","type":"string"},{"internalType":"string","name":"nidNo","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"nationality","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"}],"internalType":"struct nidInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid2","outputs":[{"components":[{"internalType":"string","name":"f_name","type":"string"},{"internalType":"string","name":"m_name","type":"string"},{"internalType":"string","name":"permanentAddress","type":"string"},{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct nidInfo2","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid3","outputs":[{"components":[{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct nidInfo3","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getNidArrayElement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNidArrayLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getNidNo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nidNoArray","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_imageUrlFront","type":"string"},{"internalType":"string","name":"_imageUrlBack","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_nationality","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"}],"name":"setNid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_f_name","type":"string"},{"internalType":"string","name":"_m_name","type":"string"},{"internalType":"string","name":"_permanentAddress","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setNid2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signerAddress","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setNid3","outputs":[],"stateMutability":"nonpayable","type":"function"}];
      const nid = new ethers.Contract('0x9361F0002ae98cB042928Ae90d1B08fa6C3dc1C7',nidABI,wallet);
      const nidNo = await nid.getNidNo(walletAddress);
      console.log(nidNo);
      if(nidNo)
      {
        const [info, info2, result] = await Promise.all([
          nid.getNid(nidNo),
          nid.getNid2(nidNo),
          nid.getNid3(nidNo)
        ]);

        console.log(info,info2,result);
    
        let msg = "";
        msg = msg.concat(info[0],info[1],info[2],info[3],info2[0],info2[1],info2[2],info[4],info[5],info[6]);
        console.log(msg);
        await share.setShareInfo(true,obj.imgFront,obj.imgBack,msg,shareWallet,walletAddress,result[2],result[3]);
        await share.setShareData(shareWallet,walletAddress);
        await share.setShareWalletData(walletAddress,shareWallet);
        console.log("Data is Shared to:",shareWallet)
      }
      else
      {
        console.log("Select checkbox!!!!");
      }
    }
  
   
  }
async function seeShareDataList() {
      const network = "goerli";
      const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
      const provider2 = new ethers.AlchemyProvider(
        network,
      demo
      );
      const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
      const shareABI = [{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"checkShareStatus","outputs":[{"components":[{"internalType":"bool","name":"share","type":"bool"},{"internalType":"string","name":"image_front","type":"string"},{"internalType":"string","name":"image_back","type":"string"},{"internalType":"string","name":"message","type":"string"},{"internalType":"address","name":"shareAddress","type":"address"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct Info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"getShareData","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"getShareWalletData","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_shareAdddress","type":"address"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setShareData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_share","type":"bool"},{"internalType":"string","name":"_imageFront","type":"string"},{"internalType":"string","name":"_imageBack","type":"string"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"address","name":"_shareAddress","type":"address"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setShareInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_shareAddress","type":"address"}],"name":"setShareWalletData","outputs":[],"stateMutability":"nonpayable","type":"function"}];
      const share = new ethers.Contract('0x4f300b85D81C939aeA9CFCf760206322B3d647CA',shareABI,wallet);


      const result = await share.getShareWalletData(walletAddress);
      console.log(result);
      const cardData = [
        // { title: 'Card 1', imageURL_front: 'url1.jpg', imageURL_back:"url1.jpg"},
        // { title: 'Card 2', imageURL_front: 'url2.jpg', imageURL_back:"url2.jpg"},
        // { title: 'Card 3', imageURL_front: 'url3.jpg', imageURL_back:"url3.jpg"},
    ];
 

      for(let i=0;i<result.length;i++)
      {
        const flag = await share.checkShareStatus(result[i]);
        if(flag[0])
        {
          var obj = {
            title:"",
            imageURL_front:"",
            imageURL_back:""
           }
          obj.title = flag[5];
          obj.imageURL_front = flag[1]; 
          obj.imageURL_back = flag[2];
          console.log("Defence");
          cardData.push(obj);
        }

      }

      console.log(cardData);
   
    const cardContainer = document.getElementById('cardList1');

    // Loop through the card data and create cards
    for (const data of cardData) {
        createCard(cardContainer, data.title, data.imageURL_front,data.imageURL_back);
    }
}
async function verifyUser(title)
{
    console.log("title",title);
  
    const network = "goerli";
    const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
    const provider2 = new ethers.AlchemyProvider(
      network,
    demo
    );
    const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
    const shareABI = [{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"checkShareStatus","outputs":[{"components":[{"internalType":"bool","name":"share","type":"bool"},{"internalType":"string","name":"image_front","type":"string"},{"internalType":"string","name":"image_back","type":"string"},{"internalType":"string","name":"message","type":"string"},{"internalType":"address","name":"shareAddress","type":"address"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct Info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"getShareData","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"getShareWalletData","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_shareAdddress","type":"address"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setShareData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_share","type":"bool"},{"internalType":"string","name":"_imageFront","type":"string"},{"internalType":"string","name":"_imageBack","type":"string"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"address","name":"_shareAddress","type":"address"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setShareInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_shareAddress","type":"address"}],"name":"setShareWalletData","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const share = new ethers.Contract('0x4f300b85D81C939aeA9CFCf760206322B3d647CA',shareABI,wallet);

    const result = await share.checkShareStatus(title);
    console.log(result);
    const signatureABI = [{"inputs":[{"internalType":"bytes32","name":"_messageHash","type":"bytes32"}],"name":"getEthSignMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"string","name":"_message","type":"string"}],"name":"getMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_ethSignedMessageHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"recover","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_signer","type":"address"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"}];
    const signatureV = new ethers.Contract('0x2B66dBD3B87C882EC6079AeD4240fd006109307F',signatureABI,wallet);
    console.log(result[6],result[3],result[7]);
    const flag = await signatureV.verify(result[6],result[3],result[7]);
    
    if(flag)
    {
      alert('The User is Valid');
    }
    else{
      alert('The User is not Valid');
    }
    
  
}
const addedTitles = new Set(); 

// Function to create a card with button
 function createCard(container, title, imageURL_front,imageURL_back) {
  if (addedTitles.has(title)) {
    console.log(`Card with title '${title}' already added. Skipping.`);
    return; // Skip the creation of the card if it's a duplicate
    }
    addedTitles.add(title);
    // Create card element
    const card = document.createElement('div');
    card.className = 'sharedCard';

    // Add title
    const titleElement = document.createElement('h3');
    titleElement.className = 'titleElement';
    titleElement.textContent = "Address:" + title;

    card.appendChild(titleElement);

    const imageContainer = document.createElement('div');
    imageContainer.className = 'imageContainer';

    // Add image
    const imageElement = document.createElement('img');
    imageElement.className = 'imageElement';
    imageElement.src = imageURL_front;
  

    imageElement.alt = title;  // Set alt attribute for accessibility

    imageContainer.appendChild(imageElement);

    const imageElement2 = document.createElement('img');
    imageElement2.className = 'imageElement2';
    imageElement2.src = imageURL_back;
    imageElement2.alt = title;  // Set alt attribute for accessibility
      
    imageContainer.appendChild(imageElement2);
    
    card.appendChild(imageContainer);
  
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'buttonContainer';

    // Add button
    const button = document.createElement('button');
    button.className = 'vBtn';
    button.textContent = 'Verify';
    button.onclick = function() {
      verifyUser(title);
  };

    buttonContainer.appendChild(button);
    card.appendChild(buttonContainer);

    // Append card to the container
    container.appendChild(card);
}

function calculateAge(birthdateString) {
  // Parse the birthdate string into a Date object
  const birthdate = new Date(birthdateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in years
  const age = currentDate.getFullYear() - birthdate.getFullYear();

  // Check if the birthday has occurred this year
  const hasBirthdayOccurred = (
      currentDate.getMonth() > birthdate.getMonth() ||
      (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() >= birthdate.getDate())
  );

  // Adjust the age based on whether the birthday has occurred this year
  return hasBirthdayOccurred ? age : age - 1;
}
async function zkpShare()
{
  let sw = document.getElementById('shareWallet');
  var shareWallet = sw.value;
  sw.value = "";

  console.log(shareWallet);
  if(!shareWallet)
  {
    console.log("Share Address is Empty!!!!");
    return;
  }

  const network = "goerli";
  const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
  const provider2 = new ethers.AlchemyProvider(
    network,
  demo
  );
   const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
   const nidABI = [{"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"checkAddressStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"checkStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid","outputs":[{"components":[{"internalType":"string","name":"imageFrontUrl","type":"string"},{"internalType":"string","name":"imageBackUrl","type":"string"},{"internalType":"string","name":"nidNo","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"nationality","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"}],"internalType":"struct nidInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid2","outputs":[{"components":[{"internalType":"string","name":"f_name","type":"string"},{"internalType":"string","name":"m_name","type":"string"},{"internalType":"string","name":"permanentAddress","type":"string"},{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"}],"internalType":"struct nidInfo2","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"}],"name":"getNid3","outputs":[{"components":[{"internalType":"string","name":"nid_No","type":"string"},{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct nidInfo3","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getNidArrayElement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNidArrayLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getNidNo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nidNoArray","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_imageUrlFront","type":"string"},{"internalType":"string","name":"_imageUrlBack","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_nationality","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signer","type":"address"}],"name":"setNid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_f_name","type":"string"},{"internalType":"string","name":"_m_name","type":"string"},{"internalType":"string","name":"_permanentAddress","type":"string"},{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"setNid2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nidNo","type":"string"},{"internalType":"address","name":"_walletAddress","type":"address"},{"internalType":"address","name":"_signerAddress","type":"address"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"setNid3","outputs":[],"stateMutability":"nonpayable","type":"function"}];
   const nid = new ethers.Contract('0x9361F0002ae98cB042928Ae90d1B08fa6C3dc1C7',nidABI,wallet);
   const nidNo = await nid.getNidNo(walletAddress);
   if(!nidNo)
   {
     console.log("Nid no is empty");
     return;
   }

   const result = await nid.getNid(nidNo);
   if(!result)
   {
    console.log("Result is empty");
     return;
   }
   const dob = result[4];
   const age = calculateAge(dob);

   const zkpABI = [{"inputs":[{"internalType":"string","name":"seed","type":"string"},{"internalType":"uint256","name":"ageActual","type":"uint256"},{"internalType":"uint256","name":"ageToProve","type":"uint256"}],"name":"calculateProof","outputs":[{"components":[{"internalType":"bytes32","name":"proof","type":"bytes32"},{"internalType":"bytes32","name":"encryptedAge","type":"bytes32"}],"internalType":"struct info","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"encryptedAge","type":"bytes32"},{"internalType":"bytes32","name":"proof","type":"bytes32"},{"internalType":"uint256","name":"ageToProve","type":"uint256"}],"name":"verifyAge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"}];
   const zkp = new ethers.Contract('0xdA18Dd53BE80b9C9Bd22d8f001f70E18c7231359',zkpABI,wallet);
  
   const seed = "AgeToProof";
   const ageActual = age; 
   const ageToProve = 18;

   const data = await zkp.calculateProof(seed,ageActual,ageToProve);
 
  //  const data = await zkp.verifyAge();
   
   console.log(data);

   const zkpShareABI = [{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"getShareAddressArray","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"getUserAddressArray","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"getUserProofAndEncryptAge","outputs":[{"components":[{"internalType":"bytes32","name":"proof","type":"bytes32"},{"internalType":"bytes32","name":"encryptedAge","type":"bytes32"}],"internalType":"struct info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_proof","type":"bytes32"},{"internalType":"bytes32","name":"encryptedAge","type":"bytes32"},{"internalType":"address","name":"_userWallet","type":"address"},{"internalType":"address","name":"_shareWallet","type":"address"}],"name":"setData","outputs":[],"stateMutability":"nonpayable","type":"function"}];
   const zkps = new ethers.Contract('0x32169efc614ef1784bBd0Bf9661f5830C2514933',zkpShareABI,wallet);
   
   await zkps.setData(data[0],data[1],walletAddress,shareWallet);
   console.log("Age Share for ZKP Verification ");

}
const addedZKPTitles = new Set(); 

async function seeShareZKPDataList() {
  const network = "goerli";
  const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
  const provider2 = new ethers.AlchemyProvider(
    network,
  demo
  );

  const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
  const zkpShareABI = [{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"getShareAddressArray","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"getUserAddressArray","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"getUserProofAndEncryptAge","outputs":[{"components":[{"internalType":"bytes32","name":"proof","type":"bytes32"},{"internalType":"bytes32","name":"encryptedAge","type":"bytes32"}],"internalType":"struct info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_proof","type":"bytes32"},{"internalType":"bytes32","name":"encryptedAge","type":"bytes32"},{"internalType":"address","name":"_userWallet","type":"address"},{"internalType":"address","name":"_shareWallet","type":"address"}],"name":"setData","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  const zkps = new ethers.Contract('0x32169efc614ef1784bBd0Bf9661f5830C2514933',zkpShareABI,wallet);
  
  const result = await zkps.getUserAddressArray(walletAddress);
  console.log(result);

 


  
  const cardData = [
      // { title: 'Card 1', content: 'Content for Card 1' },
      // { title: 'Card 2', content: 'Content for Card 2' },
      // { title: 'Card 3', content: 'Content for Card 3' },
  ];

  for(let i=0;i<result.length;i++)
  {
    var obj = {
      title:"",
      content:""
    }

    obj.title = result[0];
    obj.content = "I am greater than 18 years old";
    cardData.push(obj);

  }
  const cardContainer = document.getElementById('cardList2');

  // Loop through the card data and create cards
  for (const data of cardData) {
    createZKPCard(cardContainer, data.title, data.content);
  }
}

async function zkpVerifyFunction(title)
{
  const network = "goerli";
  const demo = "SUXVQAWwPVSA5LAjqWciQTI1uNE2y0hd";
  const provider2 = new ethers.AlchemyProvider(
    network,
  demo
  );

  const wallet = new ethers.Wallet("f6473145547386e265211f9cda206478c21e509ed0744c687aa2b5f9e4e04929",provider2);
  const zkpABI = [{"inputs":[{"internalType":"string","name":"seed","type":"string"},{"internalType":"uint256","name":"ageActual","type":"uint256"},{"internalType":"uint256","name":"ageToProve","type":"uint256"}],"name":"calculateProof","outputs":[{"components":[{"internalType":"bytes32","name":"proof","type":"bytes32"},{"internalType":"bytes32","name":"encryptedAge","type":"bytes32"}],"internalType":"struct info","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"encryptedAge","type":"bytes32"},{"internalType":"bytes32","name":"proof","type":"bytes32"},{"internalType":"uint256","name":"ageToProve","type":"uint256"}],"name":"verifyAge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"}];
  const zkp = new ethers.Contract('0xdA18Dd53BE80b9C9Bd22d8f001f70E18c7231359',zkpABI,wallet);

  const zkpShareABI = [{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"getShareAddressArray","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"getUserAddressArray","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"getUserProofAndEncryptAge","outputs":[{"components":[{"internalType":"bytes32","name":"proof","type":"bytes32"},{"internalType":"bytes32","name":"encryptedAge","type":"bytes32"}],"internalType":"struct info","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_proof","type":"bytes32"},{"internalType":"bytes32","name":"encryptedAge","type":"bytes32"},{"internalType":"address","name":"_userWallet","type":"address"},{"internalType":"address","name":"_shareWallet","type":"address"}],"name":"setData","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  const zkps = new ethers.Contract('0x32169efc614ef1784bBd0Bf9661f5830C2514933',zkpShareABI,wallet);
  const result = await zkps.getUserProofAndEncryptAge(title);
 

  if(!result)
  {
    console.log("No ZKP share data found!!!");
  }

  const flag = await zkp.verifyAge(result[1],result[0],18);
  if(flag)
  {
    alert("Claim Statement is Valid");
  }
  
}

// Function to create a card with buttons
function createZKPCard(container, title, content) {
  if (addedZKPTitles.has(title)) {
    console.log(`Card with title '${title}' already added. Skipping.`);
    return; // Skip the creation of the card if it's a duplicate
    }
    addedZKPTitles.add(title);
  // Create card element
  const card = document.createElement('div');
  card.className = 'sharedZKPCard';

  // Add title and content
  const titleElement = document.createElement('h3');
  titleElement.textContent = "Address:"+title;

  const contentElement = document.createElement('p');
  contentElement.textContent = "Claim: "+content;

  card.appendChild(titleElement);
  card.appendChild(contentElement);

  // Add button
  const button = document.createElement('button');
  button.className = 'ZKPVerifyBtn';
  button.textContent = 'ZKP Verify';
  button.onclick = function() {
    zkpVerifyFunction(title);
};

  card.appendChild(button);

  // Append card to the container
  container.appendChild(card);
}



async function qrCodeScanner()
{
  const scanner = new Html5QrcodeScanner('qrCodeReader',
  {
    qrbox:{
      width:250,
      height: 250,
    },
    fps:20,
  });

  scanner.render(success,error);
    function success(result)
    {
      document.getElementById('qrCodeResult').innerHTML = 
      ` <h2>Success!</h2>
      <p>${result}</p>
      `;
      console.log(result);
      scanner.clear();
      document.getElementById('qrCodeReader').remove();
    }

    function error(err){
    console.error(err);
    }
}

 
  return (
    <div className="App">
      <div className='navbar'>
        <div className='left'>
        <h1 className='title1'>DIMS</h1>
        <h3 className='title2'>Digital Identity Management System</h3>
        </div>
      
        <div className='right'>
          <div className='l_right'>
              {isConnected && (<h3 className='walletAddress'>walletAddress: {walletAddress}</h3>)}
          </div>
          <div className='r_right'>
               {isConnected && isRegistered &&(<h3 className='profileName'>Username: {userName}</h3>)}
               {isConnected ? (<button onClick={disconnect} className='disconnectButton'>Disconnect</button>):
              <button onClick={(requestAccount)} className='connectButton'>Connect</button>
              }
          </div>
        </div>

      </div>
      {isGovt &&
       (<div className='govtSection'> 
        <h2>Register Here</h2>
        <input type='text' className='username' placeholder='Issuer Name' id='issuerName'></input><br></br>
        <input type='text' className='username' placeholder='Issuer Wallet Address' id='walletAddress'></input><br></br>
        <div className='error-message3' id='errorMessage3'></div>
        <button onClick={registerIssuer} className='registerButton'>Register</button>
       
       </div>)
      }
      {isConnected && isIssuer && (walletAddress == '0x08daaaad8a50a90fef25fbda7bdd4fb1b1f8dd5f')&&
       (<div className='NidIssuer'>
     
        <div className='seeList'>
        
        <div className='signedList'>
        <button onClick={seeSignedList} className='seeSignedListBtn'>See Signed List</button> 
            <ul id="cardList2" className='cardList'>
          

          </ul>
        </div>
        <div className='pendingList'>
           <button onClick={seePendingList} className='seePendingListBtn'>See Pending List</button> 
          <ul id="cardList" className='cardList'>
      

          </ul>
        </div>
        
         
        </div>
        <div className='checkList'>
          <input type='text' placeholder='Nid No' className='checkListNidInput' id='searchNidNo'></input>
          <button onClick={checkNidCard} className='checkNidCardBtn'>Check Nid Card</button>

          {isCheckNidClick &&(
             <div className='nidDetails'>
             <img src="" alt="IPFS Image" className='image' id='img'></img>
             <img src="" alt="IPFS Image" className='image' id='img2'></img>
                 <label className='label'>
                       <span id="l1">Option 1</span>
                 </label> 
                 <label className='label'>
                       <span id="l2">Option 1</span>
                 </label> 
                 <label className='label'>
                       <span id="l3">Option 1</span>
                 </label> 
                 <label className='label'>
                       <span id="l4">Option 1</span>
                 </label> 
                 <label className='label'>
                       <span id="l5">Option 1</span>
                 </label> 
                 <label className='label'>
                       <span id="l6">Option 1</span>
                 </label> 
                 <label className='label'>
                       <span id="l7">Option 1</span>
                 </label>
                 <label className='label'>
                       <span id="l8">Option 1</span>
                 </label>
                 <label className='label'>
                       <span id="l9">Option 1</span>
                 </label>
                 {console.log("isSigned",isSigned)}
                 {!isSigned && (
                    <button onClick={signBtn} className='signBtn'>Sign</button>
                 )}
          
                
   
             </div>
   
          )}
         


          
        </div>
        </div>)

      }
    
      {isConnected && !isRegistered  &&!isGovt&&(<div className='registrationCard'>
        <h2>Register Here</h2>
    
        <input type='text' className='username' placeholder='UserName' id='UserName'></input><br></br>
        <div className='error-message2' id='errorMessage2'></div>
        <button onClick={register} className='registerButton'>Register</button>
      </div>)}

      {console.log(isConnected,isRegistered,userType)}
      {isConnected && isRegistered &&!isGovt && !isIssuer
       &&(

        <div className='userSection'> 
            <label class="custom-checkbox"  onClick={() => toggleCheckbox('nidCard')}>
              <input type="checkbox" class="option-checkbox" id="nidCard"></input><br></br>
              <i class="option-icon fas fa-id-card"></i><br></br>
              NID Card
            </label>
            <label class="custom-checkbox1" onClick={() => toggleCheckbox('liCard')}>
              <input type="checkbox" class="option-checkbox" id="liCard"></input><br></br>
              <i class="option-icon fas fa-id-card-alt"></i><br></br>
              License Card
            </label>
            <label class="custom-checkbox2" onClick={() => toggleCheckbox('eduCard')}>
              <input type="checkbox" class="option-checkbox" id="eduCard"></input><br></br>
              <i class="option-icon fas fa-university"></i><br></br>
              Educational Card/Certificate
            </label>
            <label class="custom-checkbox3" onClick={() => toggleCheckbox('passCard')}>
              <input type="checkbox" class="option-checkbox" id="passCard"></input><br></br>
              <i class="option-icon fas fa-passport"></i><br></br>
              Passport
            </label>
            <label class="custom-checkbox4" onClick={() => toggleCheckbox('verify')}>
              <input type="checkbox" class="option-checkbox" id="verify"></input><br></br>
              <i class="option-icon fas fa-check"></i><br></br>
              Verify Request
            </label>
            <label class="custom-checkbox4" onClick={() => toggleCheckbox('qrverify')}>
              <input type="checkbox" class="option-checkbox" id="qrverify"></input><br></br>
              <i class="option-icon fas fa-qrcode"></i><br></br>
              QR Code Show or Verify
            </label>
        </div>
       )
      }

        {console.log("hello",isNidCardRequest)}

        {isNidCardRequest && isNidCard &&(
          <div className='afterRequestNidSection'>
              <h2 className='cardDetails'>NID Card Details</h2>
              <div className='imageSection'>
              <label onClick={() => toggleShareCheckbox('imageFront')}>
                 <input type="checkbox" id="imageFront" value="" className="shareCheckBox"></input>
              </label>
              <img src="" alt="IPFS Image" className='image' id='image'></img>
              <label onClick={() => toggleShareCheckbox('imageBack')}>
                  <input type="checkbox" id="imageBack" value="" className="shareCheckBox"></input>
              </label>
              <img src="" alt="IPFS Image" className='image' id='image2'></img>
              </div>
              <div className='afterImageSection'>
                <label id="label1" className='label' onClick={() => toggleShareCheckbox('option1')}>
                <input type="checkbox" id="option1" value="" className="shareCheckBox"></input><span id="labelText1">Option 1</span>
                </label> 
                <label id="label2" className='label' onClick={() => toggleShareCheckbox('option2')}>
                <input type="checkbox" id="option2" value="" className="shareCheckBox"></input><span id="labelText2">Option 2</span>
                </label> 
                <label id="label3" className='label' onClick={() => toggleShareCheckbox('option3')}>
                <input type="checkbox" id="option3" value="" className="shareCheckBox"></input><span id="labelText3">Option 3</span>
                </label> 
                <label id="label4" className='label' onClick={() => toggleShareCheckbox('option4')}>
                <input type="checkbox" id="option4" value="" className="shareCheckBox"></input><span id="labelText4">Option 4</span>
                </label> 
                <label id="label5" className='label' onClick={() => toggleShareCheckbox('option5')}>
                <input type="checkbox" id="option5" value="" className="shareCheckBox"></input><span id="labelText5">Option 5</span>
                </label> 
                <label id="label6" className='label' onClick={() => toggleShareCheckbox('option6')}>
                <input type="checkbox" id="option6" value="" className="shareCheckBox"></input><span id="labelText6">Option 6</span>
                </label> 
                <label id="label7" className='label' onClick={() => toggleShareCheckbox('option7')}>
                <input type="checkbox" id="option7" value="" className="shareCheckBox"></input><span id="labelText7">Option 7</span>
                </label> 
                <label id="label8" className='label' onClick={() => toggleShareCheckbox('option8')}>
                <input type="checkbox" id="option8" value="" className="shareCheckBox"></input><span id="labelText8">Option 8</span>
                </label> 
                <label id="label9" className='label'>
                <span id="labelText9">Option 9</span>
                </label> 
                <div className='shareSection'>

                <input type='text' placeholder='Share Wallet Address' className='shareAddress' id='shareWallet'></input>
                <button className='shareButton' onClick={shareInfo}>Share</button>
                <button className='ZKPButton' onClick={zkpShare}>Zero Knowledge Share</button>
                </div>
                
       
             </div>
          
            
          </div>
        )}

      


      {isConnected && isRegistered 
       &&isNidCard&&!isNidCardRequest&&
       (
        <div className='nidCard' id='nidForm'>
            <h1 className='identityTitle'>Fill Up same as NID Card</h1>
            <label for="fileFront" className='filelabel' >Select Nid Front Image</label>
            <input type="file" id='fileFront' onChange={(event)=>setSelectedFrontFile(event.target.files[0])}/><br></br>
            <label for="fileBack" className='filelabel' >Select Nid Back Image</label>
            <input type="file" id='fileBack' onChange={(event)=>setSelectedBackFile(event.target.files[0])}/><br></br>
            <input type='text' placeholder='NID No' className='nidTextInput' id='nidNo'></input>
            <input type='text' placeholder='Name' className='nidTextInput' id='name'></input>
            <input type='text' placeholder='Father Name' className='nidTextInput' id='f_name'></input>
            <input type='text' placeholder='Mother Name' className='nidTextInput' id='m_name'></input>
            <label for="dob" className='doblabel' >Birth Date: </label>
            <input type='date' placeholder='Date of Birth' className='nidTextInput' id='dob'></input>
            <input type='text' placeholder='Permanent Address' className='nidTextInput' id='p_address'></input>
            <input type='text' placeholder='Nationality' className='nidTextInput' id='nationality'></input>
            <div className='error-message' id='errorMessage'></div>
            <button onClick={pinFileToIPFS} className='addIdentityButton'>Add Identity</button>

            {/* {ipfsHash && (
              <div>
                <p>IPFS Hash: {ipfsHash}</p>
                <button onClick={retrieveFileFromIPFS}>Retrieve from IPFS</button>
                <img src='' id='imageId'></img>
              </div>
            )} */}
        </div>
       )
       }
       {console.log("verify:::",isNidCard,isLiCard,isEduCard,isPassCard,isVerify)}
      
      {isConnected && isRegistered && isVerify&&(

          <div className='verifySection'>
              <div className='vleft'>
              <button className='shareZKPDataList' onClick={seeShareZKPDataList}>See ZKP Data </button>
              <div id="cardList2"></div>
              </div>
              <div className='vright'>
                <button className='shareDataList' onClick={seeShareDataList}>See Shared Data </button>
                <div id="cardList1"></div>
              </div>
          </div>

      )}

       {isConnected && isRegistered && isQrVerify&&(

        <div className='qrCode'>
            QR CODE
            <div id='qrCodeReader'></div>
            <div id='qrCodeResult'></div>
            <button onClick={qrCodeScanner}>QR Code Scan</button>
        </div>

        )}

     

     
    </div>
  );
}

export default App;
