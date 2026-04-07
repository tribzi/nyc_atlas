import json
import os
from dotenv import load_dotenv
# MUST be called before importing graph!
load_dotenv()
from langchain_core.messages import HumanMessage
from graph import app

# Load the API key from the .env file
load_dotenv()

if __name__ == "__main__":
    print("🤖 Starting the NYC Atlas Researcher Agent...")

    # We explicitly tell it to format the output as JSON
    system_prompt = """
    You are an expert GIS researcher. Find exactly ONE (1) highly specific, interactive web maps related of New York City (NYC).
    The maps may relate to the following topics:
          * Boundaries
          * Demographics
          * Dining
          * Elections
          * Employment
          * Health
          * History
          * Housing
          * Land Use
          * Nature and Parks
          * Permits
          * Planning
          * Politics
          * Population
          * Property
          * Public Assistance
          * Public Information
          * Race and Ethnicity
          * Resiliency and Climate
          * Safety
          * Tourism
          * Transportation
          * Utilities
          * Waste
          * Water
    Use your search and scrape tools to verify the information.

    CRITICAL INSTRUCTION: Once you find ONE valid map, STOP SEARCHING immediately. Do not keep looking for better ones.

    OUTPUT FORMAT: Your final response must be ONLY a raw JSON array containing exactly one object. Do not include markdown formatting like ```json.

    The object must have the following keys:
    "title" (string)
    "url" (string)
    "author" (string)
    "description" (string)
    "themes" (an array of string tags chosen strictly from the bulleted list above)

    If the data is available on the page, please also include the following keys:
    "publication_date" (string), "data_sources" (string of comma separated values), and "last_updated" (string).
    """

    inputs = {"messages": [HumanMessage(content=system_prompt)]}

    # 2. THE LEASH: Force LangGraph to kill the loop if it exceeds 20 steps.
    config = {"recursion_limit": 20}

    # Stream the graph execution
    final_response = ""
    try:
        # Pass the config variable into the stream
        for output in app.stream(inputs, stream_mode="values", config=config):
            last_message = output["messages"][-1]
            print(f"Agent is thinking/acting... (Message type: {type(last_message).__name__})")
            final_response = last_message.content
    except Exception as e:
        print(f"\n⚠️ Agent stopped by LangGraph: {e}")

# Save the output to a file
    output_path = os.path.join(os.path.dirname(__file__), "output", "raw_maps_data.json")

    try:
        parsed_json = None

        # 1. Handle if LangChain returns a list of message blocks
        if isinstance(final_response, list):
            # Extract the raw text from the first block
            if len(final_response) > 0 and isinstance(final_response[0], dict) and "text" in final_response[0]:
                final_response = final_response[0]["text"]
            else:
                # If it somehow already converted it to a Python list, just use it
                parsed_json = final_response

        # 2. Handle if it's a string (or if we just extracted the string above)
        if isinstance(final_response, str):
            # Bulletproof: strip out markdown block quotes if the LLM forgot the rules
            clean_response = final_response.strip().replace("```json", "").replace("```", "").strip()
            parsed_json = json.loads(clean_response)

        # 3. Save to the file
        with open(output_path, "w") as f:
            json.dump(parsed_json, f, indent=4)
        print(f"\n✅ Success! Data saved to {output_path}")

    except Exception as e:
        print(f"\n⚠️ Could not save the data. Error: {e}")
        print("Here is the raw output we tried to parse:")
        print(final_response)
