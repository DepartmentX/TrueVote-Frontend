"use client";
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { FACTORY_ABI, FACTORY_ADDRESS } from '../../lib/constants';

export default function CreateCampagain() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [factory, setFactory] = useState<InstanceType<typeof Web3.prototype.eth.Contract> | null>(null);
  const [account, setAccount] = useState('');

  // Form state
  const [candidateNames, setCandidateNames] = useState('');
  const [duration, setDuration] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [campaignDesc, setCampaignDesc] = useState('');
  const [startTime, setStartTime] = useState('');
  const [status, setStatus] = useState('');
  const [newCampaignAddress, setNewCampaignAddress] = useState('');

  useEffect(() => {
    const loadBlockchain = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const factoryInstance = new web3.eth.Contract(FACTORY_ABI, FACTORY_ADDRESS);
        setFactory(factoryInstance);
      } else {
        alert('Please install MetaMask!');
      }
    };

    loadBlockchain();
  }, []);

  const handleCreateCampaign = async () => {
    if (!factory) return;

    try {
      const candidateArray = candidateNames.split(',').map(name => name.trim());
      const durationInMinutes = parseInt(duration);
      const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);

      setStatus('Creating campaign...');

      const receipt = await factory.methods
        .createCampaign(candidateArray, durationInMinutes, campaignName, campaignDesc, startTimestamp)
        .send({ from: account });

      // Extract event data from the receipt
      const event = receipt.events?.CampaignCreated;

      if (event && event.returnValues) {
        const campaignAddress = event.returnValues.campaignAddress;
        setNewCampaignAddress(campaignAddress as string);
        setStatus(`✅ Campaign created at address: ${campaignAddress}`);
      } else {
        setStatus('⚠️ Campaign created, but event not found.');
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ Error creating campaign!');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create Campaign</h1>
      <p>Connected Account: {account}</p>

      <div>
        <label>Candidate Names (comma-separated):</label><br />
        <input value={candidateNames} onChange={(e) => setCandidateNames(e.target.value)} />
      </div>

      <div>
        <label>Duration (in minutes):</label><br />
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </div>

      <div>
        <label>Campaign Name:</label><br />
        <input value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
      </div>

      <div>
        <label>Campaign Description:</label><br />
        <input value={campaignDesc} onChange={(e) => setCampaignDesc(e.target.value)} />
      </div>

      <div>
        <label>Voting Start Time:</label><br />
        <input type="datetime-local" onChange={(e) => setStartTime(e.target.value)} />
      </div>

      <button onClick={handleCreateCampaign} style={{ marginTop: '1rem' }}>
        Create Campaign
      </button>

      <p style={{ marginTop: '1rem' }}>{status}</p>

      {newCampaignAddress && (
        <div style={{ marginTop: '1rem' }}>
          <strong>New Campaign Address:</strong><br />
          <code>{newCampaignAddress}</code>
        </div>
      )}
    </div>
  );
}
